import { StacksProvider } from '@mobily/stacks';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootStack } from './screens';

export const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StacksProvider spacing={4}>
          <RootStack />
        </StacksProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
