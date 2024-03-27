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
}

export const AppTextInput = ({
  label,
  rightIcon,
  leftIcon,
  containerStyle,
  inputStyle,
  multiline = false,
  ...props
}: IProps) => {
  const [height, setHeight] = useState(0);
  return (
    <View style={[styles.body, {...containerStyle}]}>
      {label && (
        <View style={{marginBottom: 5}}>
          <Text>{label}</Text>
        </View>
      )}
      <View
        style={[
          styles.inputContaner,
          {...inputStyle},
          {
            height: Math.max(multiline ? 100 : 60, height),
            marginTop: multiline ? 5 : 0,
          },
        ]}>
        {leftIcon && leftIcon}
        <TextInput
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
