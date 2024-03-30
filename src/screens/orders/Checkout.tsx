/* eslint-disable react/no-unstable-nested-components */
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BaseView,
  Divider,
  FlexedView,
  Spacer,
  ViewContainer,
} from '@components/view';
import Header from '@components/header';
import {Paragraph} from '@components/text/text';
import colors from '@utility/colors';
import {NAIRA} from '@utility/naira';
import sharedImages from '@utility/sharedImages';
import Radio from '@components/radio';
import {AppButton} from '@components/button';
import {useModal} from '@providers/DynamicModalProvider';
import {windowHeight, writeToClipboard} from '@utility/helpers';
import {HomeNavigatorParams} from 'src/types';
import {useNavigation} from '@react-navigation/native';

const Checkout = () => {
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const [payMethod, setPayMethod] = useState('card');
  const {close, show} = useModal();

  const TransferModalV = () => {
    return (
      <BaseView background={colors.white}>
        <ViewContainer>
          <Header backAction={close} title="Checkout" />
          <Spacer height={windowHeight * 0.2} />
          <ViewContainer style={styles.tranferV}>
            <Paragraph textAlign="center" fontSize={16} fontWeight="600">
              Bank Transfer
            </Paragraph>
            <Spacer />
            <Paragraph textAlign="center">
              You can make your payment to the{' '}
              <Paragraph fontSize={17} fontWeight="600">
                Paystack{' '}
              </Paragraph>
              Account number, with Account name
            </Paragraph>
            <Paragraph
              textAlign="center"
              mt={8}
              color={colors.primary}
              fontWeight="700">
              PRIMEBARZAR
            </Paragraph>
            <Paragraph mt={7} textAlign="center">
              Click the i have paid button after you have paid
            </Paragraph>
            <Paragraph mt={15} textAlign="center">
              Account Number
            </Paragraph>
            <Spacer height={15} />
            <TouchableOpacity onPress={() => writeToClipboard('09536356245')}>
              <FlexedView justifyContent="center">
                <Paragraph fontSize={16} fontWeight="600">
                  089923453
                </Paragraph>

                <Image source={sharedImages.icons.copy} />
              </FlexedView>
            </TouchableOpacity>
          </ViewContainer>
          <Spacer height={windowHeight * 0.15} />
          <AppButton
            variant="primary"
            text="I have paid"
            onPress={() => {
              close();
              navigate('Orders');
            }}
          />
        </ViewContainer>
      </BaseView>
    );
  };

  const pay = () => {
    if (payMethod === 'transfer') {
      show({
        as: 'fullscreen',
        content: <TransferModalV />,
      });
    }
  };

  return (
    <BaseView>
      <ViewContainer style={{flex: 1}}>
        <Header title="Checkout" />
        <Spacer />
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Paragraph fontSize={18} color={colors.black} fontWeight="600">
                Your order
              </Paragraph>
              <Paragraph mt={6}>
                1 product from{' '}
                <Paragraph fontWeight="700">OJB Declutter</Paragraph>
              </Paragraph>
            </View>
            <Spacer />
            <FlexedView justifyContent="space-between">
              <FlexedView>
                <Paragraph>1x</Paragraph>
                <Paragraph>3.5kva Elepaq Generator</Paragraph>
              </FlexedView>
              <Paragraph>{`${NAIRA}150,000.00`}</Paragraph>
            </FlexedView>
            <Spacer height={40} />
            <View>
              <Paragraph fontSize={18} fontWeight="600">
                Payment Summary
              </Paragraph>
              <Spacer />
              <FlexedView justifyContent="space-between">
                <Paragraph>Order Total</Paragraph>
                <Paragraph>{`${NAIRA}150,000.00`}</Paragraph>
              </FlexedView>
              <Spacer height={10} />
              <FlexedView justifyContent="space-between">
                <Paragraph>Item discount</Paragraph>
                <Paragraph>{`${NAIRA}0.00`}</Paragraph>
              </FlexedView>
              <Spacer height={10} />
              <FlexedView justifyContent="space-between">
                <Paragraph>Coupon Discount</Paragraph>
                <Paragraph>{`${NAIRA}0.00`}</Paragraph>
              </FlexedView>
              <Spacer height={27} />
              <Divider height={2} />
              <Spacer height={15} />
              <FlexedView justifyContent="space-between">
                <Paragraph>Total</Paragraph>
                <Paragraph>{`${NAIRA}150,000.00`}</Paragraph>
              </FlexedView>
            </View>
            <Spacer height={30} />
            <View>
              <Paragraph fontSize={18} color={colors.black} fontWeight="600">
                Payment Method
              </Paragraph>
              <Spacer />
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
            </View>
            <Spacer height={40} />
            <AppButton onPress={pay} variant="primary" text="Pay" />
          </ScrollView>
        </View>
      </ViewContainer>
    </BaseView>
  );
};

export default Checkout;

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

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  tranferV: {
    backgroundColor: colors.primary400,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
