import React from 'react';
import {Text, TextStyle} from 'react-native';
import {fontPixel} from '@utility/pxToDpConvert';
import {PropsWithChildren} from 'react';
import colors from '@utility/colors';

interface TextProps extends PropsWithChildren {
  style?: TextStyle;
  color?: string;
  textAlign?: TextStyle['textAlign'];
  fontSize?: TextStyle['fontSize'];
  lineHeight?: TextStyle['lineHeight'];
  fontWeight?: TextStyle['fontWeight'];
  mt?: TextStyle['marginTop'];
  mr?: TextStyle['marginRight'];
}

export const Paragraph = ({
  children,
  color = colors.black,
  fontSize = fontPixel(15),
  lineHeight,
  fontWeight,
  mr = fontPixel(5),
  mt,
  textAlign = 'left',
  style,
}: TextProps) => {
  const capitalize = (str: string) => {
    if (typeof str !== 'string' || str.length === 0) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const capitalizedChildren =
    typeof children === 'string' ? capitalize(children) : children;

  return (
    <Text
      style={[
        {
          color,
          fontSize,
          lineHeight,
          fontWeight,
          marginTop: mt,
          marginRight: mr,
          textAlign: textAlign,
        },
        style,
      ]}>
      {capitalizedChildren}
    </Text>
  );
};
