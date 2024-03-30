/* eslint-disable @typescript-eslint/no-unused-vars */
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {BaseView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import HomeCard from '@screens/components/HomeCard';
import data from '../../data';

const RecentlyViewed = () => {
  const {homeScreenDeals} = data;
  return (
    <BaseView>
      <ViewContainer>
        <Header title="Recently Viewed" />
        <Spacer />
      </ViewContainer>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.border,
          paddingHorizontal: 20,
        }}>
        <Spacer />
        <ScrollView>
          {homeScreenDeals.map((item, index) => (
            <Pressable key={index} style={{flex: 1, marginBottom: 20}}>
              <HomeCard {...item} />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </BaseView>
  );
};

export default RecentlyViewed;

const styles = StyleSheet.create({});
