import React, {useRef} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Animated,
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
import {Slides} from '@screens/onboarding/data';
const HomeScreen: React.FC = ({}) => {
  const {homeTopDeals} = data;
  const {homeScreenDeals} = data;
  const scrollX = useRef(new Animated.Value(0)).current;
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
            <View
              style={{
                backgroundColor: '#BADEFB',
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={sharedImages.icons.cart}
                tintColor={colors.primary}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            </View>
          }
        />
        <ScrollView style={{height: '100%'}}>
          <FlexedView
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 12,
            }}
            justifyContent="center">
            <AppTextInput
              leftIcon={
                <Image
                  source={sharedImages.icons.search}
                  tintColor={colors.primary}
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
              }}
            />

            <FlexedView
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                flex: 1,
                marginLeft: 12,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {homeTopDeals.map((item, index) => (
              <DealCard key={index} {...item} />
            ))}
          </ScrollView>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            <Dots
              slides={Slides}
              // index={currentIndex}
              scrollX={scrollX}
            />
          </View>
          <View style={{}}>
            <Spacer />
            <ScrollView>
              {homeScreenDeals.map((item, index) => (
                <Pressable key={index} style={{flex: 1}}>
                  <HomeCard {...item} />
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
