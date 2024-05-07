/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlexedView, ViewContainer} from '@components/view';
import colors from '@utility/colors';
import Header from '@components/header';
import sharedImages from '@utility/sharedImages';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ProductCard from '@components/ProductCard';
import data from '../../data';
import {AppButton} from '@components/button';
import HomeCard from '@screens/components/HomeCard';
import {addToCart} from '@store/cart';
import {useDispatch} from 'react-redux';
import {useModal} from '@providers/DynamicModalProvider';
import {
  useGetProductInfoQuery,
  useGetSimilarProductsQuery,
} from '@services/products';
import {Product} from '@services/products/interface';
const ProductDetails = () => {
  const route = useRoute();
  type ProductDetailsRoute = {
    StoreDetailsScreen: {
      storeId: string;
    };
  };
  type YourNavigationType = NavigationProp<ProductDetailsRoute>;
  const dispatch = useDispatch();
  const navigation: YourNavigationType = useNavigation();
  const {show, close} = useModal();
  const {productId} = route.params as any;
  const {data: details} = useGetProductInfoQuery(productId);
  const [productDetails, setProductDetails] = useState<Product>(details?.data);
  useEffect(() => {
    setProductDetails(details?.data);
  }, [details?.data]);
  const {data: simProd} = useGetSimilarProductsQuery({
    title: productDetails?.title ?? '',
    category: productDetails?.category?.name ?? '',
  });
  const [similarProducts, setSimilarProducts] = useState(simProd?.data);
  useEffect(() => {
    setSimilarProducts(simProd?.data);
  }, [simProd?.data]);
  console.log('productDetails', productDetails);
  let itemInfo = [
    {
      title: 'Model',
      description: productDetails?.model_no,
    },
    {
      title: 'Brand',
      description: productDetails?.brand,
    },
    {
      title: 'Condition',
      description: productDetails?.condition,
    },
    {
      title: 'Defects',
      description: productDetails?.defects,
    },
    {
      title: 'Additional Info',
      description: productDetails?.description,
    },
  ];
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
        rightItem={
          <FlexedView>
            <Image
              style={styles.icon}
              source={sharedImages.icons.search}
              tintColor={'white'}
            />
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Image
                style={styles.icon}
                source={sharedImages.icons.cart}
                tintColor={'white'}
              />
            </Pressable>
          </FlexedView>
        }
        // title={details.store.name}
      />
      <ViewContainer style={{backgroundColor: '#F5F5F5', height: '100%'}}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 90}}
          showsVerticalScrollIndicator={false}>
          {productDetails != undefined && (
            <ProductCard
              fullWidth={true}
              withStoreRating={true}
              {...productDetails}
            />
          )}

          <View
            style={{
              backgroundColor: colors.white,
              padding: 16,
              marginTop: 16,
              flexDirection: 'row',
            }}>
            <View>
              {itemInfo.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                  key={index}>
                  <Text style={{fontSize: 14, fontWeight: '200'}}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{marginLeft: 17}}>
              {itemInfo.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                  key={index}>
                  <Text style={{fontSize: 14, fontWeight: '200'}}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '300',
                marginVertical: 12,
                color: '#737373',
              }}>
              Similar products
            </Text>
            {similarProducts?.map((item, index) => {
              return (
                <View key={index}>
                  <HomeCard
                    showCondition={false}
                    dealName={item.title}
                    storeName={item.store[0].name}
                    dealThumbnail={item.images[0]?.url}
                    item={item}
                    {...item}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <FlexedView
          style={{
            bottom: 70,
            width: '100%',
            marginBottom: 12,
            zIndex: 100,
          }}>
          <AppButton
            onPress={() => {
              return (
                dispatch(
                  addToCart({
                    product: {
                      product: productDetails,
                      quantity: 1,
                      product_title: productDetails.title,
                    },
                  }),
                ),
                show({
                  as: 'bottomSheet',
                  content: (
                    <View style={{backgroundColor: 'white', padding: 20}}>
                      <Text>Added to cart</Text>
                    </View>
                  ),
                })
              );
            }}
            icon={
              <Image
                source={sharedImages.icons.cart}
                tintColor={'white'}
                style={{
                  height: 16,
                  width: 16,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginLeft: 3,
                }}
              />
            }
            style={{flex: 1}}
            text="Add to cart"
          />
          <Pressable
            onPress={() => {
              navigation.navigate('StoreDetailsScreen', {
                storeId: productDetails.store._id,
              });
            }}
            style={{
              borderRadius: 10,
              marginVertical: 10,
              padding: 10,
              borderWidth: 1,
              marginLeft: 4,
              borderColor: '#737373',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Image
                source={sharedImages.icons.shop}
                tintColor="#737373"
                style={{
                  height: 16,
                  width: 16,
                  alignSelf: 'center',
                }}
              />

              <Text
                style={{
                  textAlign: 'center',
                  color: '#737373',
                  fontSize: 10,
                  fontWeight: '400',
                  marginTop: 3,
                }}>
                Visit Store
              </Text>
            </View>
          </Pressable>
        </FlexedView>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
});
