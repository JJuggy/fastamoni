/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Animated, Pressable, Text, Image} from 'react-native';
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';

interface IDropDownProp {
  label?: string;
  width: number | string;
  placeholder?: string;
  setSelectedOption?: (option: string) => void;
  selectedOption?: string;
  dropDownOptions?: string[];
}

const DropDown = ({
  label,
  width = 120,
  placeholder,
  setSelectedOption,
  selectedOption,
  dropDownOptions,
}: IDropDownProp) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const animatedHeight = new Animated.Value(0);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    selectedOption,
  );
  useEffect(() => {
    setSelectedValue(selectedOption);
  }, [selectedOption]);
  // useEffect(() => {
  //   if (showDropDown) {
  //     const contentView = Animated.View.findNodeHandle(dropdownContent); // Reference to contentView
  //     const contentHeight =
  //       contentView && contentView.value && contentView.value.height;
  //     Animated.timing(animatedHeight, {
  //       toValue: contentHeight || 0, // Adjust height as needed
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //   } else {
  //     Animated.timing(animatedHeight, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // }, [showDropDown]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleSelectOption = (option: string) => {
    toggleDropDown();
    setSelectedOption && setSelectedOption(option);
  };

  return (
    <View
      style={{
        position: 'relative',
        zIndex: 2,
      }}>
      <Text>{label}</Text>
      <Pressable
        onPress={toggleDropDown}
        style={{
          borderRadius: 8,
          borderWidth: 0.7,
          borderColor: colors.primary,
          backgroundColor: showDropDown ? colors.primary : 'white',
          height: 50,
          width: width as number,
          paddingHorizontal: 9,
          marginTop: 12,
          justifyContent: 'center',
        }}>
        <Paragraph
          style={{
            color: showDropDown ? 'white' : '#B1B1B1',
          }}>
          {selectedValue
            ? selectedValue
            : placeholder
            ? placeholder
            : 'Select an option'}
        </Paragraph>
        {showDropDown && (
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              top: 50, // Adjust the top position to avoid overlaying other components
              zIndex: 5, // Ensure dropdown is above other components
              overflow: 'hidden',
              flex: 1,
              minWidth: 60,
              // height: ,
            }}>
            <Pressable
              onPress={() => {
                toggleDropDown();
              }}
              style={{
                borderRadius: 8,
                backgroundColor: 'white',
                marginTop: 10,
                zIndex: 4,
              }}>
              {dropDownOptions?.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    handleSelectOption(option);
                  }}>
                  <Paragraph style={{padding: 10}} key={index}>
                    {option}
                  </Paragraph>
                </Pressable>
              ))}
            </Pressable>
          </Animated.View>
        )}
        <View style={{position: 'absolute', right: 12}}>
          <Image
            source={sharedImages.icons.arrowDown}
            style={{width: 20, height: 20}}
            tintColor={showDropDown ? 'white' : colors.primary}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default DropDown;
