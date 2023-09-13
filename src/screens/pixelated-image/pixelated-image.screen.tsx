import { Canvas, Drawing, Skia, useImage } from '@shopify/react-native-skia';
import { View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { makeImageParticles } from './util';

const FRICTION = 0.88;
const MOVE_SPEED = 0.88;

export const PixelatedImageScreen = () => {
  const { width: stageWidth, height: stageHeight } = useWindowDimensions();

  const image = useImage(
    'https://www.vincentvangogh.org/images/paintings/self-portrait-with-bandaged-ear-and-pipe.jpg',
  );
  if (!image) {
    return null;
  }

  const particles = makeImageParticles(image, 35, 15, stageWidth, stageHeight);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onChange((e) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const dx = e.x - particle.x;
        const dy = e.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 100;
        if (dist < minDist) {
          const angle = Math.atan2(dy, dx);
          const tx = particle.x + Math.cos(angle) * minDist;
          const ty = particle.y + Math.sin(angle) * minDist;
          const ax = tx - e.x;
          const ay = ty - e.y;
          particle.vx -= ax;
          particle.vy -= ay;
        }
      }
    });

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <GestureDetector gesture={pan}>
        <Canvas
          mode="continuous"
          style={{
            width: stageWidth,
            height: stageHeight,
          }}
        >
          <Drawing
            drawing={({ canvas }) => {
              canvas.clear(Skia.Color('black'));

              for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                particle.x += (particle.savedX - particle.x) * MOVE_SPEED;
                particle.y += (particle.savedY - particle.y) * MOVE_SPEED;

                particle.vx *= FRICTION;
                particle.vy *= FRICTION;

                particle.x += particle.vx;
                particle.y += particle.vy;

                canvas.save();
                canvas.translate(particle.x, particle.y);
                canvas.drawPicture(particle.picture);
                canvas.restore();
              }
            }}
          />
        </Canvas>
      </GestureDetector>
    </View>
  );
};
