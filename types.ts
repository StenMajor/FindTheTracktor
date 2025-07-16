
export enum GameState {
  WELCOME,
  PLAYING,
  ALL_LEVELS_COMPLETE,
}

// Bounding box coordinates are percentages (0-100) of the image's dimensions.
// (x, y) is the top-left corner of the box.
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Level {
  id: number;
  imageSrc: string;
  tractorBoundingBox: BoundingBox;
}
