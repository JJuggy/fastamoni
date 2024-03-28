import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  BaseView,
  FlexedView,
  PressableView,
  Spacer,
  ViewContainer,
} from '@components/view';
import Header from '@components/header';
import sharedImages from '@utility/sharedImages';
import data from '../../data';
import colors from '@utility/colors';
import {Paragraph} from '@components/text/text';
import {useNavigation} from '@react-navigation/native';
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
                source={sharedImages.icons['search']}
                tintColor={'#9E9E9E'}
              />
              <Image
                style={styles.icon}
                source={sharedImages.icons['cart']}
                tintColor={'#9E9E9E'}
              />
            </FlexedView>
          }
        />
        <Spacer />
        <FlatList
          style={{
            height: '100%',
          }}
          data={AllDealsOfTheDay}
          numColumns={2}
          keyExtractor={(_, ind) => ind.toString()}
          renderItem={({item}) => (
            <Pressable style={{flex: 1}}>
              <DealCard {...item} />
            </Pressable>
          )}
        />
      </ViewContainer>
    </SafeAreaView>
  );
};
interface DealCardProps {
  dealName: string;
  storeName: string;
  price: string;
  grade: string;
  location: string;
  discountedPrice: string;
}
const DealCard = ({
  dealName,
  storeName,
  price,
  grade,
  location,
  discountedPrice,
}: DealCardProps) => {
  return (
    <View style={styles.dealcardcontainer}>
      <Image
        source={sharedImages.homeScreenDealImg}
        style={{
          width: '100%',
          height: 120,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          padding: 7,
        }}>
        <FlexedView>
          <Image
            source={sharedImages.icons.verify}
            style={{
              width: 15,
              height: 15,
              tintColor: '#32E514',
              marginRight: 3,
            }}
          />
          <Paragraph
            style={{
              marginBottom: 3,
            }}
            fontSize={8}>
            {storeName}
          </Paragraph>
        </FlexedView>
        <Paragraph>{dealName}</Paragraph>
        <Paragraph style={{color: '#125386', marginVertical: 3}}>
          Grade: {grade}
        </Paragraph>
        <FlexedView
          style={{
            marginVertical: 5,
          }}>
          <Image
            style={{
              width: 15,
              height: 15,
              marginRight: 3,
            }}
            source={sharedImages.icons.location}
          />
          <Paragraph
            fontWeight="400"
            fontSize={12}
            style={{
              color: 'black',
            }}>
            {location}
          </Paragraph>
        </FlexedView>
        <FlexedView
          style={{
            marginVertical: 5,
          }}>
          <View
            style={{
              backgroundColor: '#BADEFB',
              padding: 4,
              borderRadius: 4,
            }}>
            <Paragraph
              fontSize={10}
              style={{
                color: 'white',
              }}>
              Used
            </Paragraph>
          </View>
          <View
            style={{
              backgroundColor: '#BADEFB',
              padding: 4,
              borderRadius: 4,
              marginLeft: 3,
            }}>
            <Paragraph
              fontSize={10}
              style={{
                color: 'white',
              }}>
              Servicing Required
            </Paragraph>
          </View>
        </FlexedView>
        <Paragraph
          fontWeight="500"
          fontSize={15}
          style={{
            color: 'black',
            marginVertical: 5,
          }}>
          <Image
            style={styles.nairaIconStyle}
            source={sharedImages.icons['naira']}
          />
          {price}
        </Paragraph>
        <Paragraph
          fontWeight="300"
          fontSize={12}
          style={{
            color: '#707070',
            marginVertical: 5,
            textDecorationLine: 'line-through',
          }}>
          <Image
            tintColor={'grey'}
            style={{
              width: 8,
              height: 8,
              marginRight: 5,
            }}
            source={sharedImages.icons['naira']}
          />
          {discountedPrice}
        </Paragraph>
        <PressableView
          onPress={() => null}
          style={{
            backgroundColor: '#4DABF5',
            borderRadius: 5,
            paddingVertical: 4,
          }}>
          <FlexedView>
            <Image
              source={sharedImages.icons.cart}
              style={{
                width: 15,
                height: 15,
                tintColor: 'white',
                marginRight: 3,
              }}
            />
            <Paragraph fontSize={10} style={{color: 'white'}}>
              Add to cart
            </Paragraph>
          </FlexedView>
        </PressableView>
      </View>
    </View>
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
