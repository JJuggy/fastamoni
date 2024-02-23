/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Text,
} from 'react-native';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import colors from '@utility/colors';

type Variant = 'primary' | 'secondary';

interface ButtonProps {
  onPress?: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  icon?: React.ReactElement;
  height?: number;
  variant: Variant;
}

const buttonStyle: Record<Variant, StyleProp<ViewStyle>> = {
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
};

export const AppButton: React.FC<ButtonProps> = ({
  isLoading,
  text,
  onPress,
  style,
  textStyle,
  disabled,
  height,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        buttonStyle[variant],
        {
          height: heightPixel(height ?? 56),
          borderRadius: widthPixel(15),
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      {!isLoading ? (
        <Text
          style={[
            {color: variant === 'primary' ? '#fff' : colors.primary},
            textStyle,
          ]}>
          {text}
        </Text>
      ) : (
        <ActivityIndicator color="#fff" animating={isLoading} size="small" />
      )}
    </TouchableOpacity>
  );
};
