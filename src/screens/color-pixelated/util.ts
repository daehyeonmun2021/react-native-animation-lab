import { SkImage, Skia, rect } from '@shopify/react-native-skia';

export type Pixel = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
};

export const getPixels = (
  image: SkImage,
  stageWidth: number,
  stageHeight: number,
  density: number,
) => {
  'worklet';

  const result: Pixel[] = [];

  const canvas = Skia.Surface.MakeOffscreen(stageWidth, stageHeight)!.getCanvas();
  canvas.drawImageRect(
    image,
    rect(0, 0, image.width(), image.height()),
    rect(0, 0, stageWidth, stageHeight),
    Skia.Paint(),
  );
  const pixels = Array.from(
    canvas.readPixels(0, 0, {
      alphaType: image.getImageInfo().alphaType,
      colorType: image.getImageInfo().colorType,
      width: stageWidth,
      height: stageHeight,
    })!,
  );

  for (let y = 0; y < stageHeight; y += density) {
    for (let x = 0; x < stageWidth; x += density) {
      result.push({
        x,
        y,
        r: pixels[(x + y * stageWidth) * 4],
        g: pixels[(x + y * stageWidth) * 4 + 1],
        b: pixels[(x + y * stageWidth) * 4 + 2],
        a: pixels[(x + y * stageWidth) * 4 + 3] / 255,
      });
    }
  }
  return result;
};
