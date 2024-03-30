import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Paragraph} from '@components/text/text';
import {FlexedView} from '@components/view';
import sharedImages from '@utility/sharedImages';
import {AppButton} from '@components/button';
import {IOrder, IOrderProps} from 'src/types';

const OrderItem = ({orders}: IOrderProps) => {
  const [numberOfOrders, setNumberOfOrders] = React.useState(1);
  return orders?.map((order: IOrder, index: number) => {
    return (
      <View key={index}>
        <View style={styles.container}>
          <FlexedView justifyContent="space-between">
            <FlexedView>
              <Image
                source={sharedImages.homeScreenDealImg}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 20,
                }}
              />
              <View style={{flexDirection: 'column', marginLeft: 12}}>
                <Paragraph fontSize={12} style={{color: '#B1B1B1'}}>
                  {order.storeName}
                </Paragraph>
                <Paragraph
                  fontWeight="500"
                  fontSize={15}
                  style={{
                    color: '#494949',
                    marginVertical: 5,
                  }}>
                  {order.productName}
                </Paragraph>
                <Paragraph
                  style={{
                    color: '#1E89DD',
                  }}
                  fontSize={19}
                  fontWeight="800">
                  <Image
                    tintColor={'#1E89DD'}
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: 5,
                    }}
                    source={sharedImages.icons['naira']}
                  />
                  {order.price}
                </Paragraph>
              </View>
            </FlexedView>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 7,
                flexDirection: 'row',
                paddingHorizontal: 6,
                marginTop: 'auto',
                paddingVertical: 4,
              }}>
              <Pressable
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  numberOfOrders > 0 && setNumberOfOrders(num => num - 1);
                }}>
                <Image
                  tintColor={'#1E89DD'}
                  style={{
                    width: 15,
                    height: 2,
                    marginRight: 5,
                  }}
                  source={sharedImages.icons['minus']}
                />
              </Pressable>
              <Paragraph
                fontSize={16}
                style={{
                  marginHorizontal: 10,
                }}>
                {numberOfOrders}
              </Paragraph>
              <Pressable
                onPress={() => {
                  setNumberOfOrders(num => num + 1);
                }}>
                <Image
                  tintColor={'#1E89DD'}
                  style={{
                    width: 16,
                    height: 16,
                    marginLeft: 5,
                  }}
                  source={sharedImages.icons['add']}
                />
              </Pressable>
            </View>
          </FlexedView>
        </View>
        <FlexedView style={{marginTop: 25}} justifyContent="space-between">
          <Paragraph>Total</Paragraph>
          <FlexedView>
            <Image
              tintColor={'#1E89DD'}
              style={{
                width: 15,
                height: 15,
                marginRight: 5,
              }}
              source={sharedImages.icons['naira']}
            />
            <Paragraph
              style={{
                color: '#1E89DD',
              }}
              fontSize={19}
              fontWeight="800">
              {order.price}
            </Paragraph>
          </FlexedView>
        </FlexedView>
      </View>
    );
  });
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EEEEF1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
