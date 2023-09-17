import {
  Blur,
  Canvas,
  ColorMatrix,
  Drawing,
  Group,
  Paint,
  Skia,
  useFont,
} from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { makeParticle, makePointsFromString, randomInt, sample } from './util';

const TOTAL_PARTICLES = 500;
const FRICTION = 0.88;
const MOVE_SPEED = 0.92;

export const TypographyMetaballScreen = () => {
  const { width: stageWidth, height: stageHeight } = useWindowDimensions();

  const fontSize = stageWidth;
  const font = useFont(require('./Hind-Bold.ttf'), fontSize);
  if (!font) {
    return null;
  }

  const strings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const stringPointsList = strings.map((str) =>
    makePointsFromString(str, font, 15, stageWidth, stageHeight),
  );

  let sequence = 0;
  const particles = [...Array(TOTAL_PARTICLES)].map(() => makeParticle(stringPointsList[sequence]));

  const updateSequence = () => {
    sequence = randomInt(0, stringPointsList.length - 1);
  };

  const updateParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      const stringPoint = sample(stringPointsList[sequence]);
      particle.savedX = stringPoint.x;
      particle.savedY = stringPoint.y;

      const dx = particle.x - particle.savedX;
      const dy = particle.y - particle.savedY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const tx = particle.savedX + Math.cos(angle) * dist;
      const ty = particle.savedY + Math.sin(angle) * dist;
      const ax = tx - particle.savedX;
      const ay = ty - particle.savedY;
      particle.vx += ax;
      particle.vy += ay;
    }
  };

  const tap = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => {
      updateSequence();
      updateParticles();
    });

  return (
    <GestureDetector gesture={tap}>
      <Canvas
        mode="continuous"
        style={{
          width: stageWidth,
          height: stageHeight,
          backgroundColor: '#297F2E',
        }}
      >
        <Group
          layer={
            <Paint>
              <Blur blur={8} />
              <ColorMatrix
                matrix={[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 60, -40]}
              />
            </Paint>
          }
        >
          <Drawing
            drawing={({ canvas, paint }) => {
              // paint.setStyle(PaintStyle.Stroke);
              // paint.setStrokeWidth(3);
              paint.setColor(Skia.Color('#f4c129'));

              for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                particle.x += (particle.savedX - particle.x) * MOVE_SPEED;
                particle.y += (particle.savedY - particle.y) * MOVE_SPEED;

                particle.vx *= FRICTION;
                particle.vy *= FRICTION;

                particle.x += particle.vx;
                particle.y += particle.vy;

                canvas.drawCircle(particle.x, particle.y, 15, paint);
              }
            }}
          />
        </Group>
      </Canvas>
    </GestureDetector>
  );
};
