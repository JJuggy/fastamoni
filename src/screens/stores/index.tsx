/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from '@components/header';
import {BaseView, Spacer, ViewContainer} from '@components/view';
import colors from '@utility/colors';
import {widthPixel} from '@utility/pxToDpConvert';
import sharedImages from '@utility/sharedImages';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import StoreCard from '@screens/components/StoreCard';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigatorParams} from '../../types';
import {useGetStoresQuery} from '@services/stores';

const StoresScreen = () => {
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const {data} = useGetStoresQuery();
  console.log('the stores is', data);
  return (
    <SafeAreaView style={{}}>
      <ViewContainer
        style={{
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <Header
          title="Stores"
          rightItem={
            <Pressable
              onPress={() => navigate('CreateStore')}
              style={[styles.addIcon, styles.shadow]}>
              <Image source={sharedImages.icons.plus} style={styles.plus} />
            </Pressable>
          }
        />
        <Spacer />

        <FlatList
          data={data?.data}
          numColumns={2}
          keyExtractor={(_, ind) => ind.toString()}
          renderItem={({item}) => (
            <StoreCard
              item={item}
              onPress={() =>
                navigate('StoreDetailsScreen', {storeId: item._id})
              }
            />
          )}
        />
      </ViewContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingHorizontal: widthPixel(20),
  },
  plus: {
    width: widthPixel(15),
    height: widthPixel(15),
  },
  addIcon: {
    backgroundColor: '#3BADED',
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPixel(30),
    height: widthPixel(30),
    borderRadius: widthPixel(30) / 2,
  },
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default StoresScreen;
