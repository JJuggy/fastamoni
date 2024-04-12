/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import {windowHeight} from '@utility/helpers';
import {FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {HomeNavigatorParams} from 'src/types';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import {AppTextInput} from '@components/TextInput';
import {HomeScreenParam} from '@navigators/main/screens';
import data from '../../data';
import ProductCard from '@components/ProductCard';
import {useModal} from '@providers/DynamicModalProvider';
import FilterComponent from '@screens/components/FilterComponent';
import {useGetStoreProductsQuery, useGetStoreQuery} from '@services/stores';

type routeParams = RouteProp<HomeScreenParam, 'StoreDetailsScreen'>;

const StoreDetailsScreen = () => {
  const {AllDealsOfTheDay} = data;
  const {show, close} = useModal();
  const route = useRoute<routeParams>();
  const {storeId} = route.params as any;
  const {data: storeInfo} = useGetStoreQuery(storeId);
  const {data: storeProducts} = useGetStoreProductsQuery(storeId);
  const [storeDets, setStoreDets] = useState(storeInfo?.data);
  useEffect(() => {
    storeInfo?.data !== undefined && setStoreDets(storeInfo.data);
  }, [storeInfo?.data]);
  const {goBack} = useNavigation<HomeNavigatorParams>();
  const displayFilter = () => {
    show({
      as: 'fullscreen',
      content: <FilterComponent close={close} applyFilter={applyFilter} />,
    });
  };

  const applyFilter = (value: any) => {
    close();
    console.log(value, 'THE VALUES');
  };

  const ListHeader = () => {
    return (
      <View>
        <ViewContainer style={{zIndex: 100}}>
          <Paragraph
            mt={65}
            fontSize={17}
            color={colors.black}
            fontWeight="600">
            {storeDets?.name}
          </Paragraph>
        </ViewContainer>
        <ViewContainer>
          <Spacer />
          <FlexedView
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 12,
            }}
            justifyContent="center">
            <AppTextInput
              leftIcon={
                <Image
                  source={sharedImages.icons.search}
                  tintColor={colors.primary}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              }
              inputStyle={{
                backgroundColor: colors.white,
                borderWidth: 0,
              }}
              placeholder="Search any product"
              placeholderTextColor={colors.gray}
              containerStyle={{
                width: '70%',
                marginBottom: 0,
              }}
            />
            <Pressable
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                flex: 1,
                marginLeft: 12,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={displayFilter}>
              <FlexedView style={{}}>
                <Paragraph
                  style={{
                    color: colors.gray,
                  }}>
                  Filter
                </Paragraph>
                <Image
                  source={sharedImages.icons.filter}
                  tintColor={colors.primary}
                />
              </FlexedView>
            </Pressable>
          </FlexedView>
        </ViewContainer>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: storeDets?.banner?.url}}
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
          />
        </ViewContainer>
      </ImageBackground>
      <View style={{flex: 1, zIndex: 100}}>
        <Image style={styles.storeImg} source={{uri: storeDets?.logo?.url}} />
        <FlatList
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          data={storeProducts?.data?.products}
          numColumns={2}
          renderItem={({item}) => (
            <Pressable style={{flex: 1}}>
              <ProductCard
                productCardWidth={180}
                storeName={item.store[0].name}
                {...item}
              />
            </Pressable>
          )}
          ListHeaderComponent={<ListHeader />}
        />
        {/* <ScrollView>
          <ViewContainer style={{zIndex: 100}}>
            <Paragraph
              mt={65}
              fontSize={17}
              color={colors.black}
              fontWeight="600">
              Ojb Declutter
            </Paragraph>
          </ViewContainer>
          <ViewContainer>
            <Spacer />
            <FlexedView>
              <AppTextInput placeholder="Search any Product" />
            </FlexedView>
          </ViewContainer>
        </ScrollView> */}
      </View>
    </View>
  );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    backgroundColor: colors.background,
  },
  banner: {
    justifyContent: 'center',
    zIndex: -10000,
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
});
