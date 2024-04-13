import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {FlexedView, ViewContainer} from '@components/view';
import Header from '@components/header';
import {Image} from 'react-native';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import {useGetSimilarProductsQuery} from '@services/products';

const CategoryScreen = () => {
  const route = useRoute();
  const {category} = route.params as any;
  const {data: products} = useGetSimilarProductsQuery({
    title: 'gle',
    category: 'electronics',
  });
  console.log('products', products);
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
        title={category}
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
      <ViewContainer style={{backgroundColor: '#F5F5F5', height: '100%'}}>
        <Text>The category screen</Text>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
});
