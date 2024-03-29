import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Paragraph} from '@components/text/text';
import {FlexedView, Spacer} from '@components/view';
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import OrderItem from '@components/orders/orderItem';
import data from '../../../data';

const OngoingTab = () => {
  const [code, setCode] = React.useState<string[]>(['1', '2', '3', '4']);
  const {orders} = data;
  return (
    <SafeAreaView>
      <ScrollView style={{height: '100%'}}>
        <Spacer />
        <Paragraph>
          Provide the seller with the code after inspection and you're satisfied
          with the item, to finalize purchase
        </Paragraph>
        <Spacer />
        <FlexedView
          style={{paddingHorizontal: 20}}
          justifyContent="space-between">
          {code.map(cd => (
            <View
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
        <Spacer />

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
                marginLeft: 'auto',
              }}
              onPress={() => {
                console.warn('cancel order');
              }}>
              <Paragraph
                style={{
                  marginLeft: 'auto',
                  color: 'red',
                }}>
                Cancel Order
              </Paragraph>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Paragraph fontSize={16} fontWeight="600">
              Pickup Details
            </Paragraph>
            <Paragraph
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({});
