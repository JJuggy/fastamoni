import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlexedView, Spacer} from '@components/view';
import {Paragraph} from '@components/text/text';
import data from '../../../data';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import sharedImages from '@utility/sharedImages';
import {AppButton} from '@components/button';
import OngoingItem from '@components/orders/ongoingItem';
import {SafeAreaView} from 'react-native';
import {useCart} from '@store/cart/hook';
const CancelledTab = () => {
  const cart = useCart();
  return (
    <SafeAreaView>
      <ScrollView>
        <Spacer />
        {cart.cart.length == 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}>
            <Image
              source={sharedImages.emptyCat}
              style={{
                height: 300,
                width: '100%',
                marginBottom: 40,
              }}
            />
            <Paragraph fontWeight="600" color="#B1B1B1">
              There is currently no item in this Category
            </Paragraph>
            <AppButton
              style={{
                width: '100%',
                marginTop: 30,
              }}
              variant="primary"
              text="Back to Home"
              onPress={() => {
                navigate('HomeScreen');
              }}
            />
          </View>
        ) : (
          <OngoingItem type="buyer" orders={cart.cart} tab="cancelled" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelledTab;

const styles = StyleSheet.create({});
