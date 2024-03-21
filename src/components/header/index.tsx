/* eslint-disable react-native/no-inline-styles */
import {Paragraph} from '@components/text/text';
import {FlexedView} from '@components/view';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Back from '@assets/svgs/back.svg';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'src/types';
import {HomeScreenParam} from 'src/navigators/dashboard/screens';
import colors from '@utility/colors';

interface Props {
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  centerItem?: React.ReactNode;
}

const Header = ({leftItem, rightItem, centerItem}: Props) => {
  const {goBack} = useNavigation<nav<HomeScreenParam>>();
  return (
    <View
      style={[
        styles.container,
        {
          width: '100%',
          backgroundColor: 'transparent',
          // justifyContent: 'space-evenly',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable onPress={goBack}>{leftItem}</Pressable>
        <Paragraph fontSize={16} lineHeight={21} fontWeight="600">
          {centerItem}
        </Paragraph>
        <View>{rightItem}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: heightPixel(15),
    borderBottomColor: colors.border,
    border: 0,
  },
});

export default Header;
