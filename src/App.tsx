import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
          }}>
          <Text>App</Text>
        </View>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
