import { Level } from './types';

export const levels: Level[] = [
  {
    id: 1,
    imageSrc: '/images/lv1.png', // Winter Scene
    tractorBoundingBox: {
      x: 26.67,
      y: 29.16,
      width: 49.67,
      height: 30.89,
    },
  },
  {
    id: 2,
    imageSrc: '/images/lv2.png', // Green Cornfield
    tractorBoundingBox: {
      x: 23.67,
      y: 24.93,
      width: 56.00,
      height: 30.44,
    },
  },
  {
    id: 3,
    imageSrc: '/images/lv3.png', // Yellow Hayfield
    tractorBoundingBox: {
      x: 69.33,
      y: 4.49,
      width: 21.00,
      height: 12.67,
    },
  },
];
