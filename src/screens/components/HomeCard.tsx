import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlexedView, PressableView} from '@components/view';
import {Paragraph} from '@components/text/text';
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addToCart} from '@store/cart';
import {useModal} from '@providers/DynamicModalProvider';

export interface homeCardProps {
  item: any;
  dealName: string;
  storeName: string;
  price: any;
  location?: string;
  dealThumbnail: string;
  showCondition: boolean;
}
const HomeCard = ({
  item,
  dealName,
  storeName,
  price,
  location,
  dealThumbnail,
  showCondition = false,
}: homeCardProps) => {
  type HomeCardRouteParams = {
    ProductDetails: {
      details: {
        dealName: string;
        storeName: string;
        price: any;
        location: string;
      };
    };
  };
  type YourNavigationType = NavigationProp<HomeCardRouteParams>;
  const navigation: YourNavigationType = useNavigation();
  const dispatch = useDispatch();
  const {show} = useModal();
  return (
    <PressableView
      onPress={() =>
        navigation.navigate('ProductDetails', {
          details: item,
        })
      }
      style={{
        backgroundColor: colors.white,
        height: 120,
        marginBottom: 15,
      }}>
      <FlexedView
        style={{
          flexDirection: 'row',
          // width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '40%',
          }}>
          <Image source={{uri: dealThumbnail}} style={styles.dealStyle} />
        </View>
        <View
          style={{
            width: '60%',
            paddingVertical: 4,
            paddingRight: 12,
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
              fontSize={13}
              fontWeight="400"
              style={{
                color: '#131313',
              }}>
              {dealName}
            </Paragraph>
            <Paragraph
              fontWeight="700"
              fontSize={17}
              style={{
                color: '#2196F3',
                marginVertical: 4,
              }}>
              {storeName}
            </Paragraph>
            {showCondition && (
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
            )}

            {/* <FlexedView
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
            </FlexedView> */}
            <Paragraph
              fontWeight="500"
              fontSize={18}
              style={{
                color: 'black',
                marginVertical: 5,
                alignItems:'center',
                justifyContent:'center'
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
                marginTop: 'auto',
                paddingRight: 4,
              }}>
              <PressableView
                onPress={() =>
                  navigation.navigate('StoreDetailsScreen', {
                    productId: item.name,
                  })
                }
                style={{
                  backgroundColor: 'white',
                  padding: 4,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: '#4DABF5',
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Image
                  style={styles.icons}
                  source={sharedImages.icons.shop}
                  tintColor={'#4DABF5'}
                /> */}
                <Paragraph
                  fontSize={13}
                  style={{
                    color: '#4DABF5',
                    paddingBottom: 5,
                  }}>
                  Visit Store
                </Paragraph>
              </PressableView>
              <PressableView
                onPress={() => {
                  return (
                    dispatch(addToCart({product: item})),
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
                style={{
                  backgroundColor: '#4DABF5',
                  paddingVertical: 8,
                  padding: 4,
                  borderRadius: 6,
                  width: '50%',
                  marginLeft: 3,
                  alignItems: 'center',
                }}>
                {/* <Image
                  style={styles.icons}
                  source={sharedImages.icons.cart}
                  tintColor={'white'}
                /> */}
                <Paragraph
                  fontSize={13}
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
    height: 120,
    resizeMode: 'cover',
  },
  icons: {width: 10, height: 15, marginRight: 5, marginLeft: 3},
  nairaIconStyle: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
});
