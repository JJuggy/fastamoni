import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {FlexedView, ViewContainer} from '@components/view';
import Header from '@components/header';
import {Image} from 'react-native';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import {useGetSimilarProductsQuery} from '@services/products';
import ProductCard from '@components/ProductCard';

const CategoryScreen = () => {
  const route = useRoute();
  const {category} = route.params as any;
  const {data: products} = useGetSimilarProductsQuery({
    title: '',
    category: category,
  });
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
      />
      <ViewContainer style={{backgroundColor: '#F5F5F5', height: '100%'}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          style={{zIndex: 1000}}
          data={products?.data}
          numColumns={2}
          renderItem={({item}) => (
            <Pressable style={{flex: 1}}>
              <ProductCard {...item} />
            </Pressable>
          )}
        />
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
