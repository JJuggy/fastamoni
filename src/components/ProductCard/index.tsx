/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import sharedImages from '@utility/sharedImages';
import {FlexedView, PressableView} from '@components/view';
import {Paragraph} from '@components/text/text';
import {Rating} from 'react-native-rating-element';
import {store} from '@store/index';
import {Pressable} from 'react-native';
interface ProductCardProps {
  title: string;
  price: number;
  grade: string;
  location?: string;
  discountedPrice?: string;
  productImgHeight?: number;
  withStoreRating?: boolean;
  condition: string;
  rating?: number;
  pickup_state?: string;
  pickup_city?: string;
  pickup_address?: string;
  images: any;
  store: {
    name: string;
  };
  storeName?: string;
  fullWidth: boolean;
}
const ProductCard = ({
  title,
  price,
  grade,
  discountedPrice,
  productImgHeight = 180,
  withStoreRating = false,
  condition,
  rating,
  pickup_state,
  pickup_city,
  pickup_address,
  images,
  store,
  storeName,
  fullWidth,
}: ProductCardProps) => {
  const {width} = useWindowDimensions();
  return (
    <View
      style={[
        styles.dealcardcontainer,
        {
          width: fullWidth ? '100%' : width * 0.43,
        },
      ]}>
      {images?.[0]?.url != undefined && (
        <Image
          source={{uri: images?.[0].url}}
          style={{
            width: '100%',
            height: productImgHeight,
          }}
        />
      )}

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
            style={
              {
                // marginBottom: 3,
              }
            }
            fontSize={14}>
            {store.name !== undefined ? store.name : storeName}
          </Paragraph>
        </FlexedView>
        <Paragraph fontWeight="500" style={{marginVertical: 4}}>
          {title}
        </Paragraph>
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
            {pickup_state + ' ' + pickup_city + ' ' + pickup_address}
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
          <Pressable
            onPress={() => null}
            style={{
              backgroundColor: '#1E89DD',
              borderRadius: 5,
              paddingVertical: 7,
              alignItems: 'center',
              justifyContent: 'center',
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
              <Paragraph fontSize={13} style={{color: 'white'}}>
                Add to cart
              </Paragraph>
            </FlexedView>
          </Pressable>
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
              rated={rating}
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
    marginRight: 2,
  },
});
