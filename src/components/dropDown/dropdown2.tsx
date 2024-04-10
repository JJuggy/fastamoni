import {
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import {FlexedView, Spacer} from '@components/view';
import {Paragraph} from '@components/text/text';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '@utility/colors';
import {DropDownItem} from '../../types';
import sharedImages from '@utility/sharedImages';

interface IProps {
  placeholder?: string;
  value: string;
  data: DropDownItem[];
  onSelect: (selected: DropDownItem) => void;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DropdownSelect = ({placeholder, value, data, onSelect}: IProps) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'linear', initialVelocity: 2},
    });
    setShow(!show);
  };

  return (
    <View style={{marginBottom: heightPixel(20)}}>
      <Pressable style={styles.container} onPress={toggle}>
        <FlexedView justifyContent="space-between">
          <Paragraph color={value ? colors.black : colors['black-shade']}>
            {value || placeholder}
          </Paragraph>
          <Image
            source={sharedImages.icons.arrowDown}
            style={{width: 20, height: 20}}
            tintColor={'#000'}
          />
        </FlexedView>
      </Pressable>
      {show && (
        <View style={styles.options}>
          <Paragraph
            style={{paddingHorizontal: 20}}
            color={colors['black-shade']}>
            Options
          </Paragraph>
          <Spacer height={20} />
          <ScrollView contentContainerStyle={{paddingBottom: 20}}>
            {data.length
              ? data.map((dt, ind) => {
                  return (
                    <Pressable
                      onPress={() => {
                        onSelect(dt);
                        toggle();
                      }}
                      style={styles.option}
                      key={ind}>
                      <Paragraph>{dt.label}</Paragraph>
                    </Pressable>
                  );
                })
              : null}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DropdownSelect;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: heightPixel(17),
    paddingHorizontal: widthPixel(20),
    paddingLeft: widthPixel(25),
    borderRadius: 10,
  },
  options: {
    backgroundColor: colors.border,
    paddingVertical: 20,
    borderRadius: 10,
    maxHeight: heightPixel(350),
  },
  option: {
    padding: 15,
    borderBottomWidth: 0.2,
    paddingHorizontal: 20,
  },
});
