/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import {windowHeight} from '@utility/helpers';
import {FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import colors, {randomColor} from '@utility/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {HomeNavigatorParams} from 'src/types';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import {AppTextInput} from '@components/TextInput';
import {HomeScreenParam} from '@navigators/main/screens';
import data from '../../data';
import ProductCard from '@components/ProductCard';
import {useModal} from '@providers/DynamicModalProvider';
import FilterComponent from '@screens/components/FilterComponent';
import {
  useGetStoreMetricQuery,
  useGetStoreProductsQuery,
  useGetStoreQuery,
} from '@services/stores';
import {useAuth} from '@store/auth/hook';
import {Text} from 'react-native';

const MyStore = () => {
  const {user} = useAuth();
  const {data: storeMetrics} = useGetStoreMetricQuery();
  const {data: storeResponse} = useGetStoreQuery(user?.storeId as string);
  const {data: storeProducts} = useGetStoreProductsQuery(user?.storeId);
  const {AllDealsOfTheDay} = data;
  const metricColors = [
    colors.success,
    colors.warning,
    colors.primaryLight,
    colors.teal,
  ];

  const storeInfo = storeResponse?.data;
  const metric = storeMetrics?.data;
  const products = storeProducts?.data?.products;

  console.log(storeProducts, 'storeProducts');

  const {goBack, navigate} = useNavigation<HomeNavigatorParams>();

  const ListHeader = () => {
    return (
      <View style={{zIndex: 1000}}>
        <Image style={styles.storeImg} source={{uri: storeInfo?.logo?.url}} />
        <ViewContainer style={{zIndex: 100}}>
          <FlexedView
            justifyContent="space-between"
            style={{marginTop: 60, marginBottom: 30}}>
            <View>
              <Paragraph fontSize={17} color={colors.black} fontWeight="600">
                {storeInfo?.name}
              </Paragraph>
              <Paragraph fontWeight="300">Your store activity</Paragraph>
            </View>
            <View style={{alignItems: 'center'}}>
              <Pressable>
                <Image
                  source={sharedImages.icons.plus_circle}
                  tintColor={colors.primary}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </Pressable>
              <Paragraph fontWeight="300">4/30 posts</Paragraph>
            </View>
          </FlexedView>
        </ViewContainer>
        <View
          style={{
            backgroundColor: colors.white,
            maxWidth: '95%',
            alignSelf: 'center',
            flexDirection: 'column',
            padding: 10,
            borderRadius: 10,
          }}>
          <FlexedView
            justifyContent="space-between"
            style={{marginVertical: 5}}>
            <Paragraph fontSize={15} fontWeight="600">
              Performance metrics
            </Paragraph>
            <Paragraph fontSize={10} fontWeight="300">
              Last 7 days
            </Paragraph>
          </FlexedView>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={[
                  styles.metric,
                  {backgroundColor: randomColor(metricColors)},
                ]}>
                <Paragraph textAlign="center">Item Sold</Paragraph>
                <Paragraph mt={5} textAlign="center">
                  {metric?.items_sold}
                </Paragraph>
              </View>
              <View
                style={[
                  styles.metric,
                  {backgroundColor: randomColor(metricColors)},
                ]}>
                <Paragraph textAlign="center">Total Sales</Paragraph>
                <Paragraph mt={5} textAlign="center">
                  {metric?.total_sales}
                </Paragraph>
              </View>
              <View
                style={[
                  styles.metric,
                  {backgroundColor: randomColor(metricColors)},
                ]}>
                <Paragraph textAlign="center">Sales Rating</Paragraph>
                <Paragraph mt={5} textAlign="center">
                  {metric?.rating}
                </Paragraph>
              </View>
              <View
                style={[
                  styles.metric,
                  {backgroundColor: randomColor(metricColors)},
                ]}>
                <Paragraph textAlign="center">Profile Impression</Paragraph>
                <Paragraph mt={5} textAlign="center">
                  {metric?.profile_views}
                </Paragraph>
              </View>
            </ScrollView>
          </View>
        </View>
        <Spacer />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{zIndex: -1000}}>
        <ImageBackground
          source={{uri: storeInfo?.banner?.url}}
          style={[styles.banner, {height: windowHeight * 0.13}]}>
          <ViewContainer>
            <Header
              leftItem={
                <Pressable onPress={goBack} style={styles.backBtn}>
                  <Image
                    tintColor={colors.white}
                    source={sharedImages.icons.back}
                    style={{width: 15, height: 10}}
                  />
                </Pressable>
              }
              rightItem={
                <Pressable
                  onPress={() => {
                    navigate('CreateStore');
                  }}
                  style={[styles.backBtn]}>
                  <Image
                    tintColor={colors.white}
                    source={sharedImages.icons.settings}
                    style={{width: 15, height: 10}}
                  />
                </Pressable>
              }
            />
          </ViewContainer>
        </ImageBackground>
      </View>
      <View style={{zIndex: 100}}>
        {/* <Image style={styles.storeImg} source={sharedImages.storeImg} /> */}
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          style={{zIndex: 1000}}
          data={products}
          numColumns={2}
          renderItem={({item}) => <ProductCard fullWidth={false} {...item} />}
          ListHeaderComponent={<ListHeader />}
        />
      </View>
    </View>
  );
};

export default MyStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    justifyContent: 'center',
    zIndex: -1000,
  },
  backBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  storeImg: {
    width: heightPixel(80),
    height: heightPixel(80),
    borderRadius: heightPixel(80) / 2,
    resizeMode: 'cover',
    position: 'absolute',
    left: widthPixel(20),
    top: heightPixel(-20),
    zIndex: -1000,
  },
  metric: {
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 13,
    paddingHorizontal: 15,
  },
});

const metrics = [
  {
    title: 'Item Sold',
    number: 5,
  },
  {
    title: 'Total Sales',
    number: 5,
  },
  {
    title: 'Profile Impression',
    number: 35,
  },
  {
    title: 'Sales Reach',
    number: 2.5,
  },
  {
    title: 'Total Sales',
    number: 5,
  },
];
