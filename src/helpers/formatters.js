import { particlesColorRange } from '@/config';

const feelingToRGB = feeling => particlesColorRange[feeling].color;

const likesToRadius = (likes, particlesRadiusRange) => {
  let diameter = 0;
  let minDiameter = particlesRadiusRange[0] * 2;
  let maxDiameter = particlesRadiusRange[1] * 2;
  likes = likes < 0 ? 0 : likes;
  for (let i = 0; i < maxDiameter; i += 4) {
    if (likes >= i && likes <= i+4) diameter = minDiameter + i;
  }

  return !diameter ? 50 / 2 : diameter / 2;
}

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

export {
  likesToRadius,
  feelingToRGB,
  getRandom,
};
