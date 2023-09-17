import { createStackNavigator } from '@react-navigation/stack';
import { PixelatedImageScreen } from './pixelated-image';
import { TypographyMetaballScreen } from './typography-metaball/typography-metaball.screen';

export type RootStackParamList = {
  PixelatedImageScreen: undefined;
  TypographyMetaballScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TypographyMetaballScreen" component={TypographyMetaballScreen} />
      <Stack.Screen name="PixelatedImageScreen" component={PixelatedImageScreen} />
    </Stack.Navigator>
  );
};
