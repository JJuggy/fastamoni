/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Paragraph} from '@components/text/text';
import {FlexedView} from '@components/view';
import sharedImages from '@utility/sharedImages';
import {Cartitem} from '@services/carts/interface';
import {useDispatch} from 'react-redux';
import {updateCart} from '@store/cart';
import {NAIRA} from '@utility/naira';
import {useUpdateCartItemMutation} from '@services/carts';
import colors from '@utility/colors';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const OngoingItem = ({
  orders,
  type,
  tab,
}: {
  orders: Cartitem[];
  type: string;
  tab: string;
}) => {
  const [inputCodeValue, setInputCodeValue] = React.useState(['', '', '', '']);
  const [code, setCode] = React.useState<string[]>(['8', '3', '9', '1']);
  const {navigate} = useNavigation();
  return orders?.map((order: Cartitem, index: number) => {
    return (
      <View key={index}>
        <Pressable
          onPress={() => {
            navigate('OrderDetails', {
              tab: tab,
            });
          }}
          style={styles.container}>
          <FlexedView justifyContent="space-between">
            <FlexedView>
              {order?.product?.images?.length != 0 && (
                <Image
                  source={{uri: order.preview_image}}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 20,
                  }}
                />
              )}

              <View style={{flexDirection: 'column', marginLeft: 12}}>
                <Paragraph fontSize={12} style={{color: '#B1B1B1'}}>
                  {order?.store?.name ?? 'N?A'}
                </Paragraph>
                <Paragraph
                  fontWeight="500"
                  fontSize={15}
                  style={{
                    color: '#494949',
                    marginVertical: 5,
                  }}>
                  {order?.product_title}
                </Paragraph>
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
                    fontSize={10}
                    style={{
                      color: 'black',
                    }}>
                    Pickup at 17, Abudu street, Abule oja, Lagos
                  </Paragraph>
                </FlexedView>
                <Paragraph
                  style={{
                    color: '#1E89DD',
                  }}
                  fontSize={19}
                  fontWeight="800">
                  {`${NAIRA} ${order.product?.price}`}
                </Paragraph>
              </View>
            </FlexedView>
          </FlexedView>
        </Pressable>
      </View>
    );
  });
};

export default OngoingItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EEEEF1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  closeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    marginBottom: 20,
  },
});
