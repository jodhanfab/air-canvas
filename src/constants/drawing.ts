// Hand landmark connections for drawing skeleton
export const HAND_CONNECTIONS: [number, number][] = [
  // Palm
  [0, 1],
  [1, 2],
  [2, 5],
  [5, 9],
  [9, 13],
  [13, 17],
  [17, 0],
  // Thumb
  [1, 2],
  [2, 3],
  [3, 4],
  // Index
  [5, 6],
  [6, 7],
  [7, 8],
  // Middle
  [9, 10],
  [10, 11],
  [11, 12],
  // Ring
  [13, 14],
  [14, 15],
  [15, 16],
  // Pinky
  [17, 18],
  [18, 19],
  [19, 20],
];

// Drawing thresholds
export const PINCH_THRESHOLD = 0.05;
export const MIN_LINE_WIDTH = 1;
export const MAX_LINE_WIDTH = 50;
export const DEFAULT_LINE_WIDTH = 5;
export const ERASER_WIDTH = 20;

// Default colors
export const DEFAULT_COLORS = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#FF1493', // Deep Pink
  '#00FF7F', // Spring Green
  '#000000', // Black
  '#FFFFFF', // White
];

export const DEFAULT_COLOR = '#00FF00'; // Neon green

// MediaPipe configuration
export const WASM_MODEL_URL =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm';
export const HAND_LANDMARKER_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

// Hand landmark indices
export const INDEX_TIP_LANDMARK = 8;
export const THUMB_TIP_LANDMARK = 4;

