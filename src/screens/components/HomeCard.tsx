import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
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
import {useUpdateCartItemMutation} from '@services/carts';
import {useCart} from '@store/cart/hook';

export interface homeCardProps {
  item: any;
  dealName: string;
  storeName: string;
  price: any;
  location?: string;
  dealThumbnail: string;
  showCondition: boolean;
  pickup_state: string;
  pickup_city: string;
  pickup_address: string;
}
const HomeCard = ({
  item,
  dealName,
  storeName,
  price,
  location,
  dealThumbnail,
  showCondition = false,
  pickup_state,
  pickup_city,
  pickup_address,
}: homeCardProps) => {
  type HomeCardRouteParams = {
    ProductDetails: {
      productId: string;
    };
    StoreDetailsScreen: {
      productId: string;
    };
  };
  type YourNavigationType = NavigationProp<HomeCardRouteParams>;
  const navigation: YourNavigationType = useNavigation();
  const dispatch = useDispatch();
  const {show} = useModal();
  const [updateCart] = useUpdateCartItemMutation();
  const cart = useCart();

  let mutatedCartForSubmission = cart.cart.map(({product, ...rest}) => {
    return {
      ...rest,
      productId: product._id,
    };
  });

  const updateCartlist = async () => {
    try {
      updateCart({
        body: {
          items: [
            ...mutatedCartForSubmission,
            {
              productId: item._id,
              quantity: 1,
              product_title: item?.title,
            },
          ],
        },
      }).unwrap();
      dispatch(
        addToCart({
          product: {
            product: item,
            quantity: 1,
            product_title: item.title,
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
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PressableView
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item._id,
        })
      }
      style={{
        backgroundColor: colors.white,
        height: 150,
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
              fontSize={13}
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

            <FlexedView
              style={{
                marginVertical: 7,
              }}>
              <Image
                style={{
                  width: 12,
                  height: 15,
                  marginRight: 5,
                  marginLeft: 3,
                }}
                source={sharedImages.icons.location}
              />
              <Paragraph
                fontWeight="400"
                fontSize={12}
                style={{
                  color: 'black',
                }}>
                {pickup_state + ' ' + pickup_city + ' ' + pickup_address}
              </Paragraph>
            </FlexedView>
            <FlexedView style={{marginBottom: 4}}>
              <Image
                style={styles.nairaIconStyle}
                source={sharedImages.icons['naira']}
              />
              <Paragraph
                fontWeight="700"
                fontSize={18}
                style={{
                  color: 'black',
                  marginVertical: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {price}
              </Paragraph>
            </FlexedView>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 'auto',
                paddingRight: 4,
              }}>
              <Pressable
                onPress={() =>
                  navigation.navigate('StoreDetailsScreen', {
                    storeId: item.store[0]._id,
                  })
                }
                style={{
                  backgroundColor: 'white',
                  padding: 4,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: '#4DABF5',
                  width: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={styles.icons}
                  source={sharedImages.icons.shop}
                  tintColor={'#4DABF5'}
                />
                <Paragraph
                  fontSize={13}
                  style={{
                    color: '#4DABF5',
                  }}>
                  Visit Store
                </Paragraph>
              </Pressable>
              <Pressable
                onPress={updateCartlist}
                style={{
                  backgroundColor: '#1E89DD',
                  paddingVertical: 8,
                  padding: 4,
                  borderRadius: 16,
                  // width: '50%',
                  marginLeft: 3,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: 100,
                }}>
                <Image
                  style={styles.icons}
                  source={sharedImages.icons.cart}
                  tintColor={'white'}
                />
                <Paragraph
                  fontSize={13}
                  style={{
                    color: colors.white,
                  }}>
                  Add to cart
                </Paragraph>
              </Pressable>
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
    height: '100%',
    resizeMode: 'cover',
  },
  icons: {
    width: 14,
    height: 16,
    marginRight: 5,
    marginLeft: 3,
  },
  nairaIconStyle: {
    width: 14,
    height: 14,
  },
});
