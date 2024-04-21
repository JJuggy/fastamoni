/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {BaseView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import HomeCard from '@screens/components/HomeCard';
import data from '../../data';
import {useGetRecentlyViewedQuery} from '@services/products';
import {Image} from 'react-native';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';

const RecentlyViewed = () => {
  const {data: recentlyViewed} = useGetRecentlyViewedQuery();
  console.log('recently viewed', recentlyViewed?.data);
  return (
    <BaseView>
      <ViewContainer>
        <Header title="Recently Viewed" />
        <Spacer />
      </ViewContainer>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingHorizontal: 20,
        }}>
        <Spacer />

        {recentlyViewed?.data.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}>
            <Image
              source={sharedImages.emptyCat}
              style={{
                height: 300,
                width: '100%',
                marginBottom: 40,
              }}
            />
            <Paragraph fontWeight="600" color="#B1B1B1">
              You have no recently viewed product
            </Paragraph>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{paddingBottom: 120}}
            showsVerticalScrollIndicator={false}>
            {recentlyViewed?.data.map((item, index) => (
              <Pressable key={index} style={{flex: 1, marginBottom: 20}}>
                <HomeCard
                  storeName={item.store?.[0].name}
                  dealThumbnail={item.images?.[0]?.url}
                  dealName={item.product.title}
                  {...item.product}
                  item={item.product}
                />
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    </BaseView>
  );
};

export default RecentlyViewed;

const styles = StyleSheet.create({});
