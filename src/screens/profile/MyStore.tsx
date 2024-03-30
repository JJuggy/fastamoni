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
import React from 'react';
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

const MyStore = () => {
  const {AllDealsOfTheDay} = data;

  const {goBack} = useNavigation<HomeNavigatorParams>();

  const ListHeader = () => {
    return (
      <View style={{zIndex: 1000}}>
        <Image style={styles.storeImg} source={sharedImages.storeImg} />
        <ViewContainer style={{zIndex: 100}}>
          <FlexedView
            justifyContent="space-between"
            style={{marginTop: 60, marginBottom: 30}}>
            <View>
              <Paragraph fontSize={17} color={colors.black} fontWeight="600">
                Ojb Declutter
              </Paragraph>
              <Paragraph>store</Paragraph>
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
              <Paragraph>4/30 posts</Paragraph>
            </View>
          </FlexedView>
        </ViewContainer>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{zIndex: -1000}}>
        <ImageBackground
          source={sharedImages.storeBanner}
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
                <Pressable onPress={goBack} style={[styles.backBtn]}>
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
      <View style={{flex: 1, zIndex: 100}}>
        {/* <Image style={styles.storeImg} source={sharedImages.storeImg} /> */}
        <FlatList
          style={{zIndex: 1000}}
          data={AllDealsOfTheDay}
          numColumns={2}
          renderItem={({item}) => (
            <Pressable style={{flex: 1}}>
              <ProductCard {...item} />
            </Pressable>
          )}
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
});
