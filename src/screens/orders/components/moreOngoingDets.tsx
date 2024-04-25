import {Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Paragraph} from '@components/text/text';
import {FlexedView, Spacer} from '@components/view';
import {Pressable} from 'react-native';
import {Image} from 'react-native';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import CodeInputField from '@components/code-field';
import {useModal} from '@providers/DynamicModalProvider';
import {AppButton} from '@components/button';

const MoreOngoingDets = ({customerType = 'buyer'}) => {
  const [inputCodeValue, setInputCodeValue] = React.useState(['', '', '', '']);
  const [code, setCode] = React.useState<string[]>(['8', '3', '9', '1']);
  const {show, close} = useModal();
  return (
    <View>
      {customerType === 'buyer' ? (
        <Paragraph fontSize={12}>
          Provide the Seller with the code after inspection and you're satisfied
          with the item, to finalize purchase.
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

      {customerType !== 'buyer' ? (
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
      {customerType === 'buyer' && (
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
              {customerType !== 'buyer' ? (
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
                <Pressable
                  onPress={() => {
                    show({
                      as: 'normal',
                      content: (
                        <View
                          style={{
                            width: '80%',
                            backgroundColor: 'white',
                            borderRadius: 12,
                            padding: 12,
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingVertical: 12,
                            minHeight: 150,
                          }}>
                          <Image
                            style={{alignSelf: 'center', height: 30, width: 30}}
                            source={sharedImages.icons.cancelRed}
                          />
                          <View style={{marginVertical: 12}}>
                            <Paragraph style={{textAlign: 'center'}}>
                              Are you sure you want to cancel order?
                            </Paragraph>
                            <Paragraph
                              style={{textAlign: 'center'}}
                              color="#F44336"
                              fontSize={12}
                              fontWeight="300">
                              You will be charged 10% cancellation fee?
                            </Paragraph>
                          </View>
                          <AppButton
                            text="Proceed"
                            style={{backgroundColor: 'red', marginTop: 'auto'}}
                          />
                        </View>
                      ),
                    });
                  }}>
                  <Paragraph
                    style={{
                      color: '#DE3D31',
                      backgroundColor: colors.white,
                      marginLeft: 'auto',
                      padding: 6,
                    }}>
                    Cancel Order
                  </Paragraph>
                </Pressable>
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
            {/* <OrderItem orders={orders} /> */}
          </View>
        </View>
      )}
    </View>
  );
};

export default MoreOngoingDets;

const styles = StyleSheet.create({});
