import { Level } from './types';
import lv1 from './images/lv1.png';
import lv2 from './images/lv2.png';
import lv3 from './images/lv3.png';

export const levels: Level[] = [
  {
    id: 1,
    imageSrc: lv1, 
    tractorBoundingBox: {
      x: 26.67,
      y: 29.16,
      width: 49.67,
      height: 30.89,
    },
  },
  {
    id: 2,
    imageSrc: lv2, 
    tractorBoundingBox: {
      x: 23.67,
      y: 24.93,
      width: 56.00,
      height: 30.44,
    },
  },
  {
    id: 3,
    imageSrc: lv3,
    tractorBoundingBox: {
      x: 69.33,
      y: 4.49,
      width: 21.00,
      height: 12.67,
    },
  },
];
