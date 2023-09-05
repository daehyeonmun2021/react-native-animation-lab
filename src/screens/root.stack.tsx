import { createStackNavigator } from '@react-navigation/stack';
import { PixelatedImageScreen } from './pixelated-image';

export type RootStackParamList = {
  PixelatedImageScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PixelatedImageScreen" component={PixelatedImageScreen} />
    </Stack.Navigator>
  );
};
