import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '@components/header';
import {FlexedView, ViewContainer} from '@components/view';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import {NAIRA} from '@utility/naira';

const TransactionDetail = () => {
  const transactionDetails = {
    'Order Number': '44433',
    'Payment Time': '25-02-2023, 13:22:16',
    'Payment Method': 'Bank Transfer',
    'Seller Name': 'Prime Bazaar',
    Pickup: '17, Abudu street, Abule oja, Lagos',
    Amount: `${NAIRA}150000`,
  };

  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title={'Order 3244324'} />
        <View
          style={{
            // height: 400,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: 30,
            alignItems: 'center',
            padding: 15,
          }}>
          <Image
            source={sharedImages.icons.blueCheckSuccess}
            style={{width: 50, height: 50}}
          />
          <Paragraph fontSize={14} style={{marginVertical: 8}} color="#474747">
            Payment Success!
          </Paragraph>
          <Paragraph style={{marginBottom: 12}} fontWeight="700" fontSize={25}>
            {NAIRA}150000
          </Paragraph>
          <View
            style={{
              height: 3,
              borderWidth: 0.4,
              borderColor: '#EDEDED',
              width: '90%',
              backgroundColor: '#EDEDED',
            }}
          />
          <View style={{backgroundColor: 'white', width: '90%', marginTop: 12}}>
            {Object.keys(transactionDetails).map((key, index) => (
              <FlexedView style={{marginVertical: 8}}>
                <Paragraph fontSize={14} color="#707070">
                  {key}
                </Paragraph>
                <Paragraph
                  style={{marginLeft: 'auto', maxWidth: 90}}
                  fontSize={14}
                  color="black">
                  {transactionDetails[key]}
                </Paragraph>
              </FlexedView>
            ))}
          </View>
        </View>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({});
