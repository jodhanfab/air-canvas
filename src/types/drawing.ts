export interface Point {
  x: number;
  y: number;
}

export type ToolType = 'draw' | 'erase';

export interface DrawingSettings {
  color: string;
  lineWidth: number;
  tool: ToolType;
}

