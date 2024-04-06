import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FlexedView, ViewContainer} from '@components/view';
import Header from '@components/header';
import {Paragraph} from '@components/text/text';
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import {Image} from 'react-native';
import Radio from '@components/radio';

const Wallet = () => {
  const [payMethod, setPayMethod] = useState('card');

  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="Wallet" />
        <View
          style={{
            width: '100%',
            borderRadius: 20,
            padding: 20,
            backgroundColor: '#006775',
            paddingVertical: 30,
            marginVertical: 20,
          }}>
          <Paragraph
            style={{
              marginBottom: 4,
            }}
            color={colors.white}>
            Available Balance
          </Paragraph>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              tintColor={colors.white}
              source={sharedImages.icons.naira}
              style={{width: 20, height: 20}}
            />
            <Paragraph fontSize={30} fontWeight="700" color={colors.white}>
              20,000
            </Paragraph>
          </View>
        </View>
        <Paragraph fontWeight="600">Fund wallet</Paragraph>
        {options.map((op, ind) => (
          <Pressable
            onPress={() => setPayMethod(op.value)}
            style={styles.option}
            key={ind}>
            <FlexedView>
              <Image style={{width: 20, height: 20}} source={op.icon} />
              <Paragraph style={{marginLeft: 10}}>{op.label}</Paragraph>
            </FlexedView>
            <Radio
              onPress={() => setPayMethod(op.value)}
              selected={op.value === payMethod}
              color={colors.primary}
            />
          </Pressable>
        ))}
      </ViewContainer>
    </SafeAreaView>
  );
};
const options = [
  {
    label: 'Pay with card',
    icon: sharedImages.icons.card,
    value: 'card',
  },
  {
    label: 'Bank Transfer',
    icon: sharedImages.icons.bank,
    value: 'transfer',
  },
  {
    label: 'Wallet',
    icon: sharedImages.icons.wallet,
    value: 'wallet',
  },
];
export default Wallet;

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
});
