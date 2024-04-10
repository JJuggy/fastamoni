/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
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

const HomeScreen: React.FC = ({}) => {
  const {data: allProducts} = useGetProductsQuery();
  const {data: allCategories} = useGetCategoriesQuery();
  const [homeDeals, setHomeDeals] = useState(allProducts?.data);
  useEffect(() => {
    setHomeDeals(allProducts?.data);
  }, [allProducts?.data]);
  const cart = useCart();
  const {homeTopDeals} = data;
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
              {cart.cart.length != 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: 0,
                  }}>
                  <Paragraph
                    color={colors.primary}
                    fontSize={17}
                    fontWeight="600">
                    {cart.cart.length}
                  </Paragraph>
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
              onPressIn={() => {
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

          <ScrollView
            style={{height: 80, marginVertical: 8, marginTop: 12}}
            horizontal>
            {allCategories?.data.map((item, index) => (
              <Pressable key={index} style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Image
                    // source={{uri: item.thumbnail?.url}}
                    source={sharedImages.icons.device}
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
            data={homeTopDeals}
            renderItem={({item}) => <DealCard {...item} />}
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
              slides={homeTopDeals as any}
              index={currentIndex}
              scrollX={scrollX}
            />
          </View>
          <View style={{}}>
            <Spacer />
            <ScrollView>
              {homeDeals?.map((item: any, index) => (
                <Pressable key={index} style={{flex: 1}}>
                  <HomeCard
                    showCondition={false}
                    dealName={item.title}
                    storeName={item.store.name}
                    price={item.price}
                    dealThumbnail={item.thumbnail?.url}
                    item={item}
                    {...item}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
          {/* </BaseView> */}
        </ScrollView>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default HomeScreen;
