'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from '@mediapipe/tasks-vision';
import WelcomeScreen from './WelcomeScreen';
import Instructions from './Instructions';
import Toolbar from './Toolbar';
import {
  HAND_CONNECTIONS,
  PINCH_THRESHOLD,
  DEFAULT_COLOR,
  ERASER_WIDTH,
  INDEX_TIP_LANDMARK,
  THUMB_TIP_LANDMARK,
  WASM_MODEL_URL,
  HAND_LANDMARKER_MODEL_URL,
  DEFAULT_LINE_WIDTH,
} from '@/constants/drawing';
import { DrawingSettings, ToolType, Point } from '@/types/drawing';

export default function HandDrawingCanvas() {
  const webcamRef = useRef<Webcam>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [settings, setSettings] = useState<DrawingSettings>({
    color: DEFAULT_COLOR,
    lineWidth: DEFAULT_LINE_WIDTH,
    tool: 'draw',
  });

  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const lastVideoTimeRef = useRef<number>(-1);
  const animationFrameRef = useRef<number | null>(null);
  const prevPointRef = useRef<Point | null>(null);

  const handleStart = useCallback(() => {
    setIsCameraOn(true);
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setSettings((prev) => ({ ...prev, color }));
  }, []);

  const handleLineWidthChange = useCallback((width: number) => {
    setSettings((prev) => ({ ...prev, lineWidth: width }));
  }, []);

  const handleToolChange = useCallback((tool: ToolType) => {
    setSettings((prev) => ({ ...prev, tool }));
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = drawingCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const drawHandSkeleton = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      landmarks: any[],
      videoWidth: number,
      videoHeight: number,
    ) => {
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      for (const [startIdx, endIdx] of HAND_CONNECTIONS) {
        const start = landmarks[startIdx];
        const end = landmarks[endIdx];
        if (!start || !end) continue;

        ctx.beginPath();
        ctx.moveTo(start.x * videoWidth, start.y * videoHeight);
        ctx.lineTo(end.x * videoWidth, end.y * videoHeight);
        ctx.stroke();
      }

      ctx.fillStyle = '#FF0000';
      for (const lm of landmarks) {
        const x = lm.x * videoWidth;
        const y = lm.y * videoHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [],
  );

  const drawLine = useCallback(
    (ctx: CanvasRenderingContext2D, from: Point, to: Point) => {
      const currentSettings = settingsRef.current;
      const isErasing = currentSettings.tool === 'erase';
      const color = isErasing ? 'rgba(0,0,0,1)' : currentSettings.color;
      const lineWidth = isErasing ? ERASER_WIDTH : currentSettings.lineWidth;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.globalCompositeOperation = isErasing
        ? 'destination-out'
        : 'source-over';
      ctx.lineCap = 'round';
      ctx.stroke();
    },
    [],
  );

  const processResults = useCallback(
    (results: HandLandmarkerResult | null) => {
      const videoWidth = webcamRef.current?.video?.videoWidth || 1280;
      const videoHeight = webcamRef.current?.video?.videoHeight || 720;

      const overlayCanvas = overlayCanvasRef.current;
      const drawingCanvas = drawingCanvasRef.current;

      if (!overlayCanvas || !drawingCanvas) return;

      if (overlayCanvas.width !== videoWidth) {
        overlayCanvas.width = videoWidth;
        overlayCanvas.height = videoHeight;
        drawingCanvas.width = videoWidth;
        drawingCanvas.height = videoHeight;
      }

      const overlayCtx = overlayCanvas.getContext('2d');
      const drawingCtx = drawingCanvas.getContext('2d');

      if (!overlayCtx || !drawingCtx) return;

      overlayCtx.save();
      overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      if (results && results.landmarks && results.landmarks.length > 0) {
        for (const landmarks of results.landmarks) {
          drawHandSkeleton(overlayCtx, landmarks, videoWidth, videoHeight);

          const indexTip = landmarks[INDEX_TIP_LANDMARK];
          const thumbTip = landmarks[THUMB_TIP_LANDMARK];

          const distance = Math.hypot(
            indexTip.x - thumbTip.x,
            indexTip.y - thumbTip.y,
          );

          const x = indexTip.x * videoWidth;
          const y = indexTip.y * videoHeight;

          if (distance < PINCH_THRESHOLD) {
            if (prevPointRef.current) {
              drawLine(drawingCtx, prevPointRef.current, { x, y });
            }
            prevPointRef.current = { x, y };
          } else {
            prevPointRef.current = null;
          }
        }
      }

      overlayCtx.restore();
    },
    [drawHandSkeleton, drawLine],
  );

  useEffect(() => {
    if (!isCameraOn) return;

    let isCancelled = false;

    const initLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(WASM_MODEL_URL);

        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: HAND_LANDMARKER_MODEL_URL,
          },
          runningMode: 'VIDEO',
          numHands: 1,
        });

        if (isCancelled) {
          handLandmarker.close();
          return;
        }

        handLandmarkerRef.current = handLandmarker;

        const predict = () => {
          const video = webcamRef.current?.video;
          const landmarker = handLandmarkerRef.current;

          if (!video || !landmarker) {
            animationFrameRef.current = window.requestAnimationFrame(predict);
            return;
          }

          if (video.readyState < 2) {
            animationFrameRef.current = window.requestAnimationFrame(predict);
            return;
          }

          const startTimeMs = performance.now();

          if (video.currentTime !== lastVideoTimeRef.current) {
            lastVideoTimeRef.current = video.currentTime;
            const results = landmarker.detectForVideo(video, startTimeMs);
            processResults(results);
          }

          animationFrameRef.current = window.requestAnimationFrame(predict);
        };

        predict();
      } catch (err) {
        console.error('Failed to initialize HandLandmarker', err);
      }
    };

    initLandmarker();

    return () => {
      isCancelled = true;
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (handLandmarkerRef.current) {
        handLandmarkerRef.current.close();
        handLandmarkerRef.current = null;
      }
    };
  }, [isCameraOn, processResults]);

  if (!isCameraOn) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="relative h-screen w-full bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <Webcam
        ref={webcamRef}
        className="absolute top-0 left-0 w-full h-full object-cover transform -scale-x-100"
        mirrored={true}
        videoConstraints={{
          facingMode: 'user',
        }}
      />

      <canvas
        ref={drawingCanvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover transform -scale-x-100"
      />

      <canvas
        ref={overlayCanvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none"
      />

      <Instructions />

      <Toolbar
        settings={settings}
        onColorChange={handleColorChange}
        onLineWidthChange={handleLineWidthChange}
        onToolChange={handleToolChange}
        onClear={clearCanvas}
      />
    </div>
  );
}
