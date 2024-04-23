/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Animated,
  ViewToken,
} from 'react-native';
import {
  FlexedView,
  PressableView,
  Spacer,
  ViewContainer,
} from '@components/view';
import {Paragraph} from '@components/text/text';
import Header from '@components/header';
import {AppTextInput} from '@components/TextInput';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import DealCard from '@components/dealCard';
import data from '../../data';
import HomeCard from '@screens/components/HomeCard';
import Dots from '@screens/onboarding/Dots';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigatorParams} from 'src/types';
import {useGetProductsQuery} from '@services/products';
import {useGetCategoriesQuery} from '@services/categories';
import {useCart} from '@store/cart/hook';
import {useGetTopStoresQuery} from '@services/stores';
import {useGetCartQuery} from '@services/carts';
import {addToCart, updateCart} from '@store/cart';
import {useDispatch} from 'react-redux';
import {Text} from 'react-native';

const HomeScreen: React.FC = ({}) => {
  const {data: allProducts, refetch} = useGetProductsQuery({title: ''});
  const {data: allCategories} = useGetCategoriesQuery();
  const {data: topStores} = useGetTopStoresQuery();
  const dispatch = useDispatch();
  const [homeDeals, setHomeDeals] = useState(allProducts?.data);
  const {data: cartItems} = useGetCartQuery();

  console.log(allCategories, 'allCategories');

  useEffect(() => {
    setHomeDeals(allProducts?.data);
  }, [allProducts?.data]);
  const cart = useCart();
  const {homeTopDeals} = data;
  useMemo(() => {
    cartItems?.data != undefined &&
      dispatch(
        updateCart({
          products: cartItems?.data.items,
        }),
      );
  }, [cartItems?.data.items[0]]);

  useEffect(() => {
    const focusSubscription = navigation.addListener('focus', () => {
      refetch();
    });
    return focusSubscription;
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation: HomeNavigatorParams = useNavigation();
  const onViewableItemsChanged = React.useRef(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      const newIndex = info.viewableItems[0].index;
      setCurrentIndex(newIndex as number);
    },
  ).current;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ViewContainer>
        <Header
          leftItem={
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 15,
              }}
            />
          }
          title={'PrimeBazaar'}
          rightItem={
            <Pressable
              onPress={() => {
                navigation.navigate('Orders', {
                  type: 'buyer',
                });
              }}
              style={{
                backgroundColor: '#BADEFB',
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {cart.cart !== undefined && (
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: 0,
                    height: 16,
                    width: 16,
                    borderRadius: 8,
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: colors.primary,
                    }}>
                    {cart.cart.length}
                  </Text>
                </View>
              )}

              <Image
                source={sharedImages.icons.cart}
                tintColor={colors.primary}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            </Pressable>
          }
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}>
          <FlexedView
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 12,
            }}
            justifyContent="center">
            <AppTextInput
              onFocus={() => {
                navigation.navigate('SearchScreen');
              }}
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
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('FilterScreen');
              }}>
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

          <FlexedView
            justifyContent="space-between"
            style={{
              borderRadius: 10,
              backgroundColor: '#4DABF5',
              height: 80,
              padding: 8,
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Paragraph
                fontWeight="700"
                fontSize={20}
                style={{
                  color: colors.white,
                }}>
                Deal of the day
              </Paragraph>
              <FlexedView
                style={{
                  marginTop: 3,
                }}>
                <Image
                  source={sharedImages.icons.clock}
                  tintColor={colors.white}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <Paragraph
                  fontWeight="400"
                  fontSize={15}
                  style={{
                    color: colors.white,
                  }}>
                  22h 55m 20s remaining
                </Paragraph>
              </FlexedView>
            </View>
            <PressableView
              onPress={() => navigation.navigate('DealsOfTheDayScreen')}
              style={{
                borderWidth: 1,
                borderColor: colors.white,
                padding: 4,
                borderRadius: 4,
              }}>
              <Paragraph
                fontWeight="600"
                style={{
                  color: colors.white,
                }}>
                View all
              </Paragraph>
              <Image
                source={sharedImages.icons.arrowRight}
                tintColor={colors.white}
                style={{
                  width: 15,
                  height: 15,
                }}
              />
            </PressableView>
          </FlexedView>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 12,
              marginBottom: 6,
            }}>
            <Paragraph fontSize={14} fontWeight="700">
              Categories
            </Paragraph>
            <Pressable
              onPress={() =>
                navigation.navigate('AllCategoriesScreen', {
                  categories: allCategories?.data,
                })
              }>
              <Paragraph fontSize={13} fontWeight="400">
                View all
              </Paragraph>
            </Pressable>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{height: 80, marginVertical: 8, marginTop: 12}}
            horizontal>
            {allCategories?.data.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('CategoryScreen', {
                    category: item.name,
                  })
                }
                key={index}
                style={{
                  flex: 1,
                  marginLeft: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.icon}}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                  />
                  <Paragraph>{item.name}</Paragraph>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <FlatList
            data={topStores?.data}
            renderItem={({item}) => (
              <DealCard storeName={item.name} {...item} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            onViewableItemsChanged={onViewableItemsChanged}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Dots
              customColor={true}
              inActiveColor="#BADEFB"
              activeColor={colors.primary}
              slides={topStores?.data as any}
              index={currentIndex}
              scrollX={scrollX}
            />
          </View>
          <View style={{}}>
            <Spacer />
            <Pressable
              onPress={() =>
                navigation.navigate('AllDealsScreen', {
                  deals: homeDeals,
                })
              }
              style={{
                width: '100%',
                alignItems: 'flex-end',
                marginBottom: 12,
              }}>
              <Paragraph fontSize={13} fontWeight="400">
                View all
              </Paragraph>
            </Pressable>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 120,
              }}>
              {homeDeals?.map((item: any, index) => (
                <Pressable key={index} style={{flex: 1}}>
                  <HomeCard
                    showCondition={false}
                    dealName={item.title}
                    storeName={item.store[0].name}
                    price={item.price}
                    dealThumbnail={item.images[0]?.url}
                    item={item}
                    {...item}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default HomeScreen;
