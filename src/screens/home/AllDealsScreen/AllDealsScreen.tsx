import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlexedView, ViewContainer} from '@components/view';
import {useRoute} from '@react-navigation/native';
import {Product} from '@services/products/interface';
import {FlatList} from 'react-native';
import ProductCard from '@components/ProductCard';
import {Pressable} from 'react-native';
import Header from '@components/header';
import {Image} from 'react-native';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';

const AllDealsScreen = () => {
  const route = useRoute();
  const {deals} = route.params as {deals: Product[]};
  return (
    <SafeAreaView
      style={{
        // height: '100%',
        backgroundColor: colors.primary,
      }}>
      <Header
        tintColor="white"
        containerStyle={{
          backgroundColor: colors.primary,
          paddingHorizontal: 16,
          paddingVertical: 13,
        }}
        textColor="white"
        title={'All Products'}
        rightItem={
          <FlexedView>
            <Image
              style={styles.icon}
              source={sharedImages.icons.search}
              tintColor={'white'}
            />
            <Image
              style={styles.icon}
              source={sharedImages.icons.cart}
              tintColor={'white'}
            />
          </FlexedView>
        }
        // title={details.store.name}
      />
      <ViewContainer
        style={{backgroundColor: '#F5F5F5', height: '100%', paddingTop: 12}}>
        <FlatList
          data={deals}
          numColumns={2}
          renderItem={({item}) => (
            <Pressable style={{flex: 1}}>
              <ProductCard storeName={item.store[0].name} {...item} />
            </Pressable>
          )}
        />
      </ViewContainer>
    </SafeAreaView>
  );
};

export default AllDealsScreen;

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
});
