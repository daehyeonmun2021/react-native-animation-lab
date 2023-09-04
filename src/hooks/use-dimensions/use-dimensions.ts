import { Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const useDimensions = () => {
  return {
    windowWidth,
    windowHeight,
  };
};
