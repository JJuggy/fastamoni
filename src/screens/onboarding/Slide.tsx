/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {Slide} from './data';
import {Paragraph} from '@components/text/text';
import {Spacer} from '@components/view';
import colors from '@utility/colors';
import {heightPixel} from '@utility/pxToDpConvert';

interface Iprops {
  data: Slide;
  index: number;
}

const Slider: React.FC<Iprops> = ({data: {image, id, text, title}, index}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={[styles.swipeV, {width}]}>
      <Image source={image} style={[styles.img, {height: height * 0.4}]} />
      <Spacer />
      <Paragraph color={colors.primary} fontWeight="700" fontSize={18}>
        {title}
      </Paragraph>
      <Spacer />
      <Paragraph textAlign="center" fontSize={16}>
        {text}
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeV: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPixel(25),
  },
  img: {
    width: '100%',
    borderRadius: 15,
  },
});

export default Slider;
