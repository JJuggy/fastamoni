import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlexedView, ViewContainer} from '@components/view';
import Header from '@components/header';
import {Image} from 'react-native';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import {useGetSimilarProductsQuery} from '@services/products';
import ProductCard from '@components/ProductCard';
import {Paragraph} from '@components/text/text';
import {AppButton} from '@components/button';
import {NavigationProp} from '@react-navigation/native';

const CategoryScreen = () => {
  const route = useRoute();
  const {category} = route.params as any;
  type CategoryScreenNavProps = {
    HomeScreen: undefined;
  };
  type navType = NavigationProp<CategoryScreenNavProps>;
  const navigation: navType = useNavigation();
  const {data: products} = useGetSimilarProductsQuery({
    title: '',
    category: category,
  });
  const {width} = useWindowDimensions();
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
        {products?.data.length != 0 ? (
          <FlatList
            contentContainerStyle={{paddingBottom: 100}}
            style={{zIndex: 1000}}
            data={products?.data}
            numColumns={2}
            renderItem={({item}) => (
              <Pressable style={{flex: 1}}>
                <ProductCard fullWidth={false} {...item} />
              </Pressable>
            )}
          />
        ) : (
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
              There is currently no item in this Category
            </Paragraph>
            <AppButton
              style={{
                width: '100%',
                marginTop: 30,
              }}
              variant="primary"
              text="Back to Home"
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}
            />
          </View>
        )}
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
