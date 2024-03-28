import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BaseView, FlexedView, PressableView, Spacer} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import {widthPixel} from '@utility/pxToDpConvert';
import DropDown from '@components/dropDown';
import {Paragraph} from '@components/text/text';

const FilterScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');

  return (
    <BaseView>
      <View style={[styles.container]}>
        <Header title="Filter" />
        <View style={{marginTop: 35}}>
          <DropDown
            placeholder="Select location"
            label="Location"
            width={'100%'}
            setSelectedOption={setSelectedLocation}
            selectedOption={selectedLocation}
          />
          <Spacer />
          <DropDown
            placeholder="Select period"
            label="Select period"
            width={'50%'}
            setSelectedOption={setSelectedPeriod}
            selectedOption={selectedPeriod}
          />
          <Spacer />
          <FlexedView style={{alignItems: 'center'}}>
            <DropDown
              placeholder="Optional"
              label="Price range"
              width={'160%'}
              setSelectedOption={setSelectedMinPrice}
              selectedOption={selectedMinPrice}
            />

            <Paragraph style={{marginHorizontal: 60}}>to</Paragraph>
            <DropDown
              placeholder="Optional"
              width={'160%'}
              setSelectedOption={setSelectedMaxPrice}
              selectedOption={selectedMaxPrice}
            />
          </FlexedView>
        </View>
        <PressableView
          onPress={() => {
            console.warn('Apply filter');
          }}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 'auto',
            marginBottom: 40,
          }}>
          <Text style={{color: colors.white}}>Apply Filter</Text>
        </PressableView>
      </View>
    </BaseView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: widthPixel(20),
  },
});
