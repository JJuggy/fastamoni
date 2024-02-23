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
  title: string;
  hasRightItems?: boolean;
  hasBorder?: boolean;
}

const Header = ({title, hasBorder = true, hasRightItems = true}: Props) => {
  const {goBack} = useNavigation<nav<HomeScreenParam>>();
  return (
    <View
      style={[
        styles.container,
        {borderBottomWidth: hasBorder ? 2 : undefined},
      ]}>
      <FlexedView justifyContent="space-between">
        <Pressable onPress={goBack}>
          <FlexedView>
            <Back />

            <Paragraph fontSize={16} lineHeight={21} fontWeight="500">
              {title}
            </Paragraph>
          </FlexedView>
        </Pressable>
        {hasRightItems && (
          <FlexedView>
            <Paragraph>save</Paragraph>
          </FlexedView>
        )}
      </FlexedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPixel(20),
    paddingBottom: heightPixel(15),
    borderBottomColor: colors.border,
  },
});

export default Header;
