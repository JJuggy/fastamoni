/* eslint-disable react-native/no-inline-styles */

import React, {useRef} from 'react';
import {View, StyleSheet, useWindowDimensions, Animated} from 'react-native';
import {Slide} from './data';
import colors from '@utility/colors';

interface Iprops {
  slides: Slide[];
  index: number;
  scrollX: any;
}

const Dots: React.FC<Iprops> = ({slides, index, scrollX}) => {
  const animated = useRef(new Animated.Value(index)).current;
  const {height, width} = useWindowDimensions();

  return (
    <View style={[styles.container, {bottom: height / 3}]}>
      {slides.map((ob, i) => {
        const getWidth = scrollX?.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [10, 30, 10],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={{
              width: getWidth,
              height: 10,
              borderRadius: 5,
              marginRight: 5,
              backgroundColor: i === index ? colors.primary : colors.white,
              // transform: [{scaleX: getWidth()}],
            }}
            key={ob.id}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: 'grey',
    marginLeft: 10,
  },
});
export default Dots;
