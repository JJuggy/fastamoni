/* eslint-disable react/react-in-jsx-scope */
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

interface IProps extends TextInputProps {
  label?: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

export const AppTextInput = ({
  label,
  rightIcon,
  leftIcon,
  containerStyle,
  inputStyle,
  ...props
}: IProps) => {
  const [height, setHeight] = useState(0);
  return (
    <View style={[styles.body, {...containerStyle}]}>
      {label && (
        <View>
          <Text>
            <label htmlFor="" />
          </Text>
        </View>
      )}
      <View
        style={[
          styles.inputContaner,
          {...inputStyle},
          {height: Math.max(60, height)},
        ]}>
        {leftIcon && leftIcon}
        <TextInput
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
    height: heightPixel(60),
  },
  input: {
    paddingHorizontal: widthPixel(15),
    flex: 1,
    height: '100%',
  },
});
