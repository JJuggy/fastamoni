/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';

interface ViewProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export const ViewContainer = ({children, style}: ViewProps) => {
  return (
    <View style={[{paddingHorizontal: widthPixel(20)}, style]}>{children}</View>
  );
};

export const Spacer = ({height}: {height?: number}) => {
  return <View style={{height: heightPixel(height ?? 20)}} />;
};
interface PressableViewProps extends PropsWithChildren {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
}

interface FlexProps extends PropsWithChildren {
  justifyContent?: ViewStyle['justifyContent'];
  style?: StyleProp<ViewStyle>;
}

export const Divider = ({
  height,
  bg = 'rgba(246, 246, 246, 1)',
}: {
  height: number;
  bg?: string;
}) => {
  return (
    <View
      style={{
        height: height ? height : 2,
        width: '100%',
        backgroundColor: bg,
      }}
    />
  );
};

export const FlexedView = ({children, justifyContent, style}: FlexProps) => {
  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center', justifyContent},
        style,
      ]}>
      {children}
    </View>
  );
};
export const  PressableView = ({
  children,
  style,
  onPress,
  textStyle,
}: PressableViewProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
        style,
      ]}>
      <Text style={[textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export const Center = ({children}: PropsWithChildren) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      {children}
    </View>
  );
};

export const BaseView = ({
  children,
  background = '#fff',
}: {background?: string} & PropsWithChildren) => {
  return (
    <View style={{flex: 1, backgroundColor: background}}>
      <KeyboardAvoidingView
        style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 70 : 100}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

export const BottomViewContainer = ({children, style}: ViewProps) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: widthPixel(20),
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          minHeight: 100,
          backgroundColor: '#fff',
          justifyContent: 'center',
        },
        style,
      ]}>
      {children}
    </View>
  );
};
