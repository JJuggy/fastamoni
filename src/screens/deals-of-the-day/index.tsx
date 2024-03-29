import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import sharedImages from '@utility/sharedImages';
import data from '../../data';
import colors from '@utility/colors';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '@components/ProductCard';
const DealsOfTheDayScreen = () => {
  const {AllDealsOfTheDay} = data;
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header
          title="Deals of the day"
          leftItem={
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={sharedImages.icons.back} />
            </Pressable>
          }
          rightItem={
            <FlexedView>
              <Image
                style={styles.icon}
                source={sharedImages.icons.search}
                tintColor={'#9E9E9E'}
              />
              <Image
                style={styles.icon}
                source={sharedImages.icons.cart}
                tintColor={'#9E9E9E'}
              />
            </FlexedView>
          }
        />
        <Spacer />
        {AllDealsOfTheDay.length != 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              height: '100%',
            }}
            data={AllDealsOfTheDay}
            numColumns={2}
            keyExtractor={(_, ind) => ind.toString()}
            renderItem={({item}) => (
              <Pressable style={{flex: 1}}>
                <ProductCard {...item} />
              </Pressable>
            )}
          />
        ) : (
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              paddingTop: 80,
            }}>
            <Image
              style={{width: 380, height: 220, resizeMode: 'cover'}}
              source={sharedImages.noDealImg}
            />
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Paragraph
                fontSize={24}
                fontWeight="800"
                style={{
                  color: '#0E3F66',
                }}>
                NO DEALS AVAILABLE
              </Paragraph>
              <Paragraph
                style={{
                  color: '',
                  textAlign: 'center',
                  marginVertical: 8,
                }}>
                Oops! there is no deal of the day available now. Please check
                back later
              </Paragraph>
            </View>
            <PressableView
              onPress={() => null}
              style={{
                backgroundColor: '#4DABF5',
                padding: 14,
                borderRadius: 5,
                width: '100%',
                marginTop: 280,
              }}>
              <Paragraph
                style={{
                  color: colors.white,
                  textAlign: 'center',
                }}>
                Go Back Home
              </Paragraph>
            </PressableView>
          </View>
        )}
      </ViewContainer>
    </SafeAreaView>
  );
};

export default DealsOfTheDayScreen;

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  dealcardcontainer: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
    margin: 5,
  },
  nairaIconStyle: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
});
