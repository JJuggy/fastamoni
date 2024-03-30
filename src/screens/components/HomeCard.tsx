import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlexedView, PressableView} from '@components/view';
import {Paragraph} from '@components/text/text';
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';

export interface homeCardProps {
  dealName: string;
  storeName: string;
  price: string;
  location: string;
}
const HomeCard = ({dealName, storeName, price, location}: homeCardProps) => {
  type HomeCardRouteParams = {
    ProductDetails: {
      details: {
        dealName: string;
        storeName: string;
        price: string;
        location: string;
      };
    };
  };
  type YourNavigationType = NavigationProp<HomeCardRouteParams>;
  const navigation: YourNavigationType = useNavigation();

  return (
    <PressableView
      onPress={() =>
        navigation.navigate('ProductDetails', {
          details: {
            dealName,
            storeName,
            price,
            location,
          },
        })
      }
      style={{
        backgroundColor: colors.white,
        height: 190,
      }}>
      <FlexedView
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '50%',
          }}>
          <Image
            source={sharedImages.homeScreenDealImg}
            style={styles.dealStyle}
          />
        </View>
        <View
          style={{
            width: '50%',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              height: '100%',
              padding: 4,
              width: 'auto',
            }}>
            <Paragraph
              fontSize={14}
              fontWeight="400"
              style={{
                color: '#131313',
              }}>
              {dealName}
            </Paragraph>
            <Paragraph
              fontWeight="700"
              fontSize={20}
              style={{
                color: '#2196F3',
                marginVertical: 4,
              }}>
              {storeName}
            </Paragraph>
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
            <FlexedView
              style={{
                marginVertical: 5,
              }}>
              <Image
                style={styles.icons}
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

            <View
              style={{
                flexDirection: 'row',
                marginTop: 6,
                paddingRight: 4,
              }}>
              <PressableView
                onPress={() => null}
                style={{
                  backgroundColor: 'white',
                  padding: 4,
                  borderRadius: 9,
                  borderWidth: 1,
                  borderColor: '#4DABF5',
                  width: '50%',
                }}>
                <Image
                  style={styles.icons}
                  source={sharedImages.icons.shop}
                  tintColor={'#4DABF5'}
                />
                <Paragraph
                  fontSize={10}
                  style={{
                    color: '#4DABF5',
                    backgroundColor: 'white',
                  }}>
                  Visit Store
                </Paragraph>
              </PressableView>
              <PressableView
                onPress={() => null}
                style={{
                  backgroundColor: '#4DABF5',
                  padding: 4,
                  borderRadius: 9,
                  width: '50%',
                  marginLeft: 3,
                }}>
                <Image
                  style={styles.icons}
                  source={sharedImages.icons.cart}
                  tintColor={'white'}
                />
                <Paragraph
                  fontSize={10}
                  style={{
                    color: colors.white,
                  }}>
                  Add to cart
                </Paragraph>
              </PressableView>
            </View>
          </View>
        </View>
      </FlexedView>
    </PressableView>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  dealStyle: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
  },
  icons: {width: 10, height: 15, marginRight: 5, marginLeft: 3},
  nairaIconStyle: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
});
