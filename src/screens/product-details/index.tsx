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
import {useRoute} from '@react-navigation/native';
import ProductCard from '@components/ProductCard';
import data from '../../data';
import {AppButton} from '@components/button';
import HomeCard from '@screens/components/HomeCard';
import {addToCart} from '@store/cart';
import {useDispatch} from 'react-redux';
import {useModal} from '@providers/DynamicModalProvider';
import {useGetSimilarProductsQuery} from '@services/products';
const ProductDetails = () => {
  const route = useRoute();
  type ProductDetailsRoute = {
    details: {
      store: {
        name: string;
        rating: number;
        location: string;
      };
      title: string;
      price: string;
      grade: string;
      images: string[];
      category: {
        name: string;
      };
    };
  };
  const dispatch = useDispatch();
  const {show, close} = useModal();
  const {details} = route.params as ProductDetailsRoute;
  const {data: simProd} = useGetSimilarProductsQuery({
    title: details.title,
    category: details?.category?.name ?? '',
  });
  const [similarProducts, setSimilarProducts] = useState(simProd?.data);
  useEffect(() => {
    setSimilarProducts(simProd?.data);
  }, [simProd?.data]);
  const {itemInfo, similarProductsInStore} = data;
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
            <Image
              style={styles.icon}
              source={sharedImages.icons.cart}
              tintColor={'white'}
            />
          </FlexedView>
        }
        title={details.store.name}
      />
      <ViewContainer style={{backgroundColor: '#F5F5F5', height: '100%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProductCard
            dealName={details.title}
            storeName={details.store[0].name}
            discountedPrice={undefined}
            price={details.price}
            grade={details.grade}
            productImages={details.images}
            canSeeAddress={false}
            withStoreRating={true}
            condition={details.condition}
            productImgHeight={200}
            {...details}
          />

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
                    price={item.price}
                    dealThumbnail={item.thumbnail[0]?.url}
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
                dispatch(addToCart({product: details})),
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
