export const backgroundImages = [
  'images/Background/bgGrass.png',
  'images/Background/bgGrass2.png',
  'images/Background/bgGrass3.png',
];

export const tractorImages = [
  'images/Tracktor/tracktorGelbSized.png',
  'images/Tracktor/tracktorRotSized.png',
];

export const getRandomElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};
