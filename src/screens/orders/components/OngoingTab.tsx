import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Paragraph} from '@components/text/text';
import {FlexedView, Spacer} from '@components/view';
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import OrderItem from '@components/orders/orderItem';
import data from '../../../data';
import {IOrder, IOrderProps} from 'src/types';
import CodeInputField from '@components/code-field';
import {Linking} from 'react-native';

const OngoingTab = ({type}: {type: string | undefined}) => {
  const {orders}: any = data;
  const [inputCodeValue, setInputCodeValue] = React.useState(['', '', '', '']);
  const [code, setCode] = React.useState<string[]>(['8', '3', '9', '1']);

  return (
    <SafeAreaView>
      <ScrollView style={{height: '100%'}}>
        <Spacer />
        <View></View>
        {type === 'buyer' ? (
          <Paragraph fontSize={10}>
            Provide the Seller with the code after inspection and you're
            satisfied with the item, to finalize purchase.
          </Paragraph>
        ) : (
          <>
            <Paragraph fontSize={12}>
              Payment has been made for your item. Buyer is enroute to your
              location.
            </Paragraph>
            <Paragraph fontSize={13} fontWeight="600" color={colors.primary}>
              Input the code from the buyer to finalize purchase.
            </Paragraph>
          </>
        )}
        <Spacer />

        {type !== 'buyer' ? (
          <CodeInputField setInputCode={setInputCodeValue} />
        ) : (
          <FlexedView
            style={{paddingHorizontal: 35}}
            justifyContent="space-between">
            {code.map((cd, idx) => (
              <View
                key={idx}
                style={{
                  borderRadius: 12,
                  width: 60,
                  height: 60,
                  backgroundColor: '#00ABC1',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Paragraph
                  style={{color: 'white'}}
                  fontSize={22}
                  fontWeight="500">
                  {cd}
                </Paragraph>
              </View>
            ))}
          </FlexedView>
        )}

        <Spacer />
        {type === 'buyer' && (
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <Pressable
                style={{
                  width: 'auto',

                  padding: 5,
                }}
                onPress={() => {
                  console.warn('cancel order');
                }}>
                {type === 'buyer' ? (
                  <Pressable
                    onPress={() => {
                      Linking.openURL(`tel:${'08058196256'}`);
                    }}>
                    <FlexedView
                      style={{
                        marginRight: 'auto',
                      }}>
                      <Image
                        style={{
                          width: 14,
                          height: 14,
                          marginRight: 4,
                        }}
                        source={sharedImages.icons.phone}
                      />
                      <Paragraph color="#4CAF50">Call Buyer</Paragraph>
                    </FlexedView>
                  </Pressable>
                ) : (
                  <Paragraph
                    style={{
                      color: '#DE3D31',
                      backgroundColor: colors.white,
                      marginLeft: 'auto',
                    }}>
                    Cancel Order
                  </Paragraph>
                )}
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <Paragraph fontSize={16} fontWeight="600">
                Pickup Details
              </Paragraph>
              <Paragraph
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 4,
                }}>
                <Image
                  source={sharedImages.icons.location}
                  tintColor={'#707070'}
                  style={{
                    width: 12,
                    height: 12,
                  }}
                />
                <Paragraph
                  style={{
                    color: '#707070',
                    marginLeft: 5,
                  }}>
                  17, Abudu street, Abule oja, Lagos
                </Paragraph>
              </Paragraph>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 18,
              }}>
              <Paragraph fontSize={16} fontWeight="600">
                Your Order
              </Paragraph>
              <OrderItem orders={orders} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({});
