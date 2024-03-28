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
}

const DropDown = ({
  label,
  width = 120,
  placeholder,
  setSelectedOption,
  selectedOption,
}: IDropDownProp) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const animatedHeight = new Animated.Value(0);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    selectedOption,
  );
  useEffect(() => {
    setSelectedValue(selectedOption);
  }, [selectedOption]);
  useEffect(() => {
    if (showDropDown) {
      Animated.timing(animatedHeight, {
        toValue: 150, // Adjust height as needed
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [showDropDown]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const handleSelectOption = () => {
    toggleDropDown();
    setSelectedOption && setSelectedOption('Option 1');
  };

  return (
    <View>
      <Text>{label}</Text>
      <Pressable
        onPress={toggleDropDown}
        style={{
          borderRadius: 8,
          borderWidth: 0.7,
          borderColor: colors.primary,
          backgroundColor: 'white',
          height: 50,
          width: width as number,
          paddingHorizontal: 7,
          marginTop: 12,
          justifyContent: 'center',
          zIndex: 0, // Set zIndex dynamically based on dropdown visibility
          position: 'relative', // Set position to relative
        }}>
        <Paragraph
          style={{
            color: '#B1B1B1',
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
              zIndex: 4, // Ensure dropdown is above other components
              overflow: 'hidden',
              height: animatedHeight,
            }}>
            <Pressable
              onPress={() => {
                toggleDropDown();
              }}
              style={{
                borderRadius: 8,
                borderWidth: 0.7,
                borderColor: colors.primary,
                marginTop: 10,
                zIndex: 4,
              }}>
              <Pressable
                onPress={() => {
                  handleSelectOption();
                }}>
                <Paragraph style={{padding: 10}}>Option 1</Paragraph>
              </Pressable>
            </Pressable>
          </Animated.View>
        )}
        <View style={{position: 'absolute', right: 12}}>
          <Image
            source={sharedImages.icons.arrowDown}
            style={{width: 20, height: 20}}
            tintColor={colors.primary}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default DropDown;
