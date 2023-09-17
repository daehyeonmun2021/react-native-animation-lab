import { SkFont, SkPoint, Skia, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';

export const sample = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const makePointsFromString = (
  str: string,
  font: SkFont,
  density: number,
  stageWidth: number,
  stageHeight: number,
) => {
  const textPath = Skia.Path.MakeFromText(
    str,
    (stageWidth - font.getTextWidth(str)) / 2,
    (stageHeight + font.getSize() / 2) / 2,
    font,
  )!;
  textPath.stroke({
    width: 1,
    cap: StrokeCap.Round,
    join: StrokeJoin.Round,
    miter_limit: 1,
    precision: 1,
  });
  textPath.dash(density, density, 0);
  return [...Array(textPath.countPoints())].map((_, i) => textPath.getPoint(i));
};

type IParticle = {
  x: number;
  y: number;
  savedX: number;
  savedY: number;
  vx: number;
  vy: number;
};

export const makeParticle = (stringPoints: SkPoint[]): IParticle => {
  const stringPoint = sample(stringPoints);
  return {
    x: stringPoint.x,
    y: stringPoint.y,
    savedX: stringPoint.x,
    savedY: stringPoint.y,
    vx: 0,
    vy: 0,
  };
};
