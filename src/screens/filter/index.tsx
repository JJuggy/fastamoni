import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  BaseView,
  FlexedView,
  PressableView,
  Spacer,
  ViewContainer,
} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import {widthPixel} from '@utility/pxToDpConvert';
import DropDown from '@components/dropDown';
import {Paragraph} from '@components/text/text';
import {useNavigation} from '@react-navigation/native';

const FilterScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const navigation = useNavigation();
  const handleApplyFilter = () => {
    //check if all fields are not empty
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <ViewContainer style={[styles.container, {backgroundColor: '#F5F5F5'}]}>
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
            dropDownOptions={['Anytime', 'For a day', 'Last hour', 'A week']}
          />
          <Spacer />
          <FlexedView style={{alignItems: 'center'}}>
            <DropDown
              placeholder="Optional"
              label="Price range"
              width={'160%'}
              setSelectedOption={setSelectedMinPrice}
              selectedOption={selectedMinPrice}
              dropDownOptions={['$0', '$10', '$20', '$30', '$40', '$50']}
            />

            <Paragraph
              style={{marginHorizontal: 60, marginTop: 29, marginRight: 12}}>
              to
            </Paragraph>
            <DropDown
              placeholder="Optional"
              width={'160%'}
              setSelectedOption={setSelectedMaxPrice}
              selectedOption={selectedMaxPrice}
              dropDownOptions={['$0', '$10', '$20', '$30', '$40', '$50']}
            />
          </FlexedView>
        </View>
        <PressableView
          onPress={() => {
            handleApplyFilter();
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
      </ViewContainer>
    </SafeAreaView>
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
