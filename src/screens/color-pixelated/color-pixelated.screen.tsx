// @refresh reset
import { Canvas, Circle, Image, Skia, rect, useImage } from '@shopify/react-native-skia';
import { FC, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Pixel, getPixels } from './util';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

type DotProps = {
  pixel: Pixel;
  radius: number;
};

const Dot: FC<DotProps> = ({ pixel, radius }) => {
  const { x, y, r, g, b, a } = pixel;
  const paint = Skia.Paint();
  paint.setColor(Skia.Color(`rgba(${r},${g},${b},${a})`));

  return <Circle cx={x} cy={y} r={radius} paint={paint} />;
};

const DENSITY = 30;

export const ColorPixelatedScreen: FC = () => {
  const { width: stageWidth, height: stageHeight } = useWindowDimensions();
  const maskingWidth = useSharedValue(0);
  const maskingBound = useDerivedValue(() => {
    return rect(0, 0, maskingWidth.value, stageHeight);
  });

  useEffect(() => {
    const showDots = () => {
      maskingWidth.value = 0;
      maskingWidth.value = withDelay(
        1000,
        withTiming(stageWidth, { duration: 500, easing: Easing.inOut(Easing.quad) }),
      );
    };
    showDots();
  }, []);

  const image = useImage(
    'https://www.iesabroad.org/sites/default/files/2023-05/view-seoul-city-skyline-seoul-tower-sunrise-south-korea.jpg',
  );
  if (!image) {
    return null;
  }

  const pixels = getPixels(image, stageWidth, stageHeight, DENSITY);

  return (
    <Canvas
      style={{
        width: stageWidth,
        height: stageHeight,
        backgroundColor: 'black',
      }}
    >
      {pixels.map((pixel, i) => (
        <Dot key={i} pixel={pixel} radius={DENSITY / 2} />
      ))}
      <Image
        image={image} //
        fit="fill"
        x={0}
        y={0}
        width={stageWidth}
        height={stageHeight}
        clip={maskingBound}
        invertClip
      />
    </Canvas>
  );
};
