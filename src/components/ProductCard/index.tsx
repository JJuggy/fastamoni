/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sharedImages from '@utility/sharedImages';
import {FlexedView, PressableView} from '@components/view';
import {Paragraph} from '@components/text/text';
import {Rating} from 'react-native-rating-element';
import {NAIRA} from '@utility/naira';
interface ProductCardProps {
  name: string;
  price: string;
  grade: string;
  pickup_address: string;
  discountedPrice?: string;
  canSeeAddress: boolean;
  productImgHeight?: number;
  withStoreRating?: boolean;
  images?: string[];
  store?: any;
  condition?: string;
  defects?: string;
}
const ProductCard = ({
  name,
  price,
  grade,
  pickup_address,
  discountedPrice,
  canSeeAddress,
  productImgHeight = 120,
  withStoreRating = false,
  images,
  store,
  condition,
  defects,
}: ProductCardProps) => {
  return (
    <View style={styles.dealcardcontainer}>
      <Image
        source={{uri: images?.[0]?.url}}
        style={{
          width: '100%',
          height: productImgHeight,
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
            {store?.[0]?.name}
          </Paragraph>
        </FlexedView>
        <Paragraph style={{marginVertical: 4}}>{name}</Paragraph>
        <Paragraph style={{color: '#125386', marginVertical: 3}}>
          Grade:{grade}
        </Paragraph>
        <FlexedView
          style={{
            marginVertical: 5,
          }}>
          <Image
            style={{
              width: 17,
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
            {canSeeAddress ? pickup_address : '******************'}
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
              {condition}
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
              {defects}
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
          {`${NAIRA} ${price}`}
        </Paragraph>
        <Paragraph
          fontWeight="300"
          fontSize={12}
          style={{
            color: '#707070',
            marginVertical: 5,
            textDecorationLine: 'line-through',
          }}>
          {discountedPrice != undefined ? (
            <FlexedView>
              <Image
                tintColor={'grey'}
                style={{
                  width: 8,
                  height: 8,
                  marginRight: 5,
                }}
                source={sharedImages.icons.naira}
              />
              <Paragraph
                style={{
                  color: '#707070',
                  marginVertical: 5,
                  textDecorationLine: 'line-through',
                }}>
                {discountedPrice}
              </Paragraph>
            </FlexedView>
          ) : null}
        </Paragraph>
        {withStoreRating === false ? (
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
        ) : (
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Paragraph
              fontSize={11}
              style={{
                marginBottom: 4,
              }}
              color="#737373">
              Store rating
            </Paragraph>
            <Rating
              rated={'4'}
              totalCount={5}
              size={14}
              type="custom"
              selectedIconImage={require('../../assets/icons/starfilled.png')}
              emptyIconImage={require('../../assets/icons/stargray.png')}
              readonly // by default is false
              direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  dealcardcontainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    margin: 5,
  },
  nairaIconStyle: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
});
