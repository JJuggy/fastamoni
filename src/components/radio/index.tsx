import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '@utility/colors';

interface IProps {
  color?: string;
  onPress: () => void;
  selected: boolean;
}

const Radio = ({color = colors.primary, onPress, selected}: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.circle, {borderColor: color}]}>
      {selected ? (
        <View style={[styles.dot, {backgroundColor: color}]} />
      ) : null}
    </TouchableOpacity>
  );
};

export default Radio;

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 7,
  },
});
