import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootStack } from './screens';
import { StatusBar } from 'react-native';

export const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <>
          <StatusBar hidden />
          <RootStack />
        </>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
