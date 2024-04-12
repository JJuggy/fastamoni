/* eslint-disable react-native/no-inline-styles */
import {ReactElement, useState} from 'react';
import {
  Text,
  TextInputProps,
  View,
  TextInput,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import colors from '../../utility/colors';
import {heightPixel, widthPixel} from '../../utility/pxToDpConvert';
import React from 'react';

interface IProps extends TextInputProps {
  label?: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  multiline?: boolean;
  labelStyle?: TextStyle;
  textLimit?: number;
}

export const AppTextInput = ({
  label,
  rightIcon,
  leftIcon,
  containerStyle,
  inputStyle,
  multiline = false,
  labelStyle,
  textLimit,
  ...props
}: IProps) => {
  const [height, setHeight] = useState(0);
  return (
    <View style={[styles.body, {...containerStyle}]}>
      {label && (
        <View style={{marginBottom: 5}}>
          <Text style={{...labelStyle}}>{label}</Text>
        </View>
      )}
      <View
        style={[
          styles.inputContaner,

          {
            height: Math.max(multiline ? 100 : 50, height),
            marginTop: multiline ? 5 : 0,
          },
          {...inputStyle},
        ]}>
        {leftIcon && leftIcon}
        <TextInput
          maxLength={textLimit}
          multiline={multiline}
          onContentSizeChange={event => {
            setHeight(event.nativeEvent.contentSize.height);
          }}
          style={[styles.input]}
          {...props}
        />
        {rightIcon && rightIcon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    marginBottom: heightPixel(20),
  },
  inputContaner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: widthPixel(15),
    paddingVertical: Platform.select({
      ios: heightPixel(10),
      android: 0,
    }),
  },
  input: {
    paddingHorizontal: widthPixel(15),
    flex: 1,
    height: '100%',
  },
});
