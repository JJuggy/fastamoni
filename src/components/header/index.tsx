import {Paragraph} from '@components/text/text';
import {FlexedView} from '@components/view';
import {widthPixel} from '@utility/pxToDpConvert';
import React, {ReactNode} from 'react';
import {Image, Pressable, StyleSheet, View, ViewStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import colors from '@utility/colors';
import {HomeScreenParam} from 'src/navigators/main/screens';
import {nav} from 'src/types';
import sharedImages from '@utility/sharedImages';

interface Props {
  title?: string;
  backAction?: () => void;
  rightItem?: ReactNode;
  leftItem?: ReactNode;
  textColor?: string;
  containerStyle?: ViewStyle;
  tintColor?: string;
}

const Header = ({
  title,
  backAction,
  rightItem,
  leftItem,
  containerStyle,
  textColor = 'black ',
  tintColor = 'black',
}: Props) => {
  const {goBack} = useNavigation<nav<HomeScreenParam>>();
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <FlexedView justifyContent="space-between">
        {leftItem ? (
          leftItem
        ) : (
          <Pressable
            onPress={() => {
              backAction ? backAction() : goBack();
            }}>
            <Image source={sharedImages.icons.back} tintColor={tintColor} />
          </Pressable>
        )}
        {title ? (
          <Paragraph
            color={textColor ? textColor : 'black'}
            fontSize={16}
            lineHeight={21}
            fontWeight="500">
            {title}
          </Paragraph>
        ) : null}
        {rightItem ? rightItem : <View />}
      </FlexedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
  },
  circle: {
    width: widthPixel(35),
    height: widthPixel(35),
    borderRadius: widthPixel(35) / 2,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
