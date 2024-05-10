/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import Header from '@components/header';
import {FlexedView, Spacer, ViewContainer} from '@components/view';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import {NAIRA} from '@utility/naira';
import {AppButton} from '@components/button';
import colors from '@utility/colors';
import {
  useGetOrderDetailsRelatedQuery,
  useVerifyOrderPaymentMutation,
} from '@services/orders';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  useNavigation,
} from '@react-navigation/native';
import {HomeScreenParam} from '@navigators/main/screens';
import {BottomTabParams} from '@navigators/bottomTabs/screens';
import {HomeNavigatorParams} from 'src/types';

interface IProp {
  id: string;
}

const PendingOrderDetails = ({id}: IProp) => {
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

  const {data} = useGetOrderDetailsRelatedQuery(id);
  const [verifyPay, refetch] = useVerifyOrderPaymentMutation();

  const [code, setCode] = React.useState<string[]>(['8', '3', '9', '1']);
  const orderDetail = data?.data?.order;
  const relatedOrders = data?.data?.related;

  // console.log(data?.data?.related, 'THE DATA OF ORDERS');

  const verifyPayment = () => {
    verifyPay(orderDetail?.payment?._id)
      .unwrap()
      .then(() => {
        navigate('Tab', {screen: 'Orders'});
      })
      .catch(err => {
        console.log(err, 'PAYMENT EROOR');
      });
  };

  const completePayment = () => {
    paystackWebViewRef.current?.startTransaction();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Paystack
          paystackKey={'pk_test_9a0d8de922a74f89c633dfa2f555fba40099a97d'}
          billingEmail="primebazaar@gmail.com"
          amount={orderDetail?.total_amount}
          onCancel={e => {
            // handle response here
          }}
          onSuccess={res => {
            console.log(res, 'THE RESPONSE FOR VERUFY');
            verifyPayment();
          }}
          ref={paystackWebViewRef as any}
        />
        <Spacer />
        <View>
          <Paragraph fontSize={18} fontWeight="700">
            Pending Orders only last for about 12 hours
          </Paragraph>
          <Spacer />
          <Paragraph>
            You haven’t completed the order below. Complete your order now
          </Paragraph>
        </View>

        <View>
          <View style={{flex: 1}}>
            <View style={styles.container}>
              <FlexedView justifyContent="space-between">
                <FlexedView>
                  <Image
                    source={{uri: orderDetail?.preview_image ?? ''}}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 20,
                    }}
                  />

                  <View style={{flexDirection: 'column', marginLeft: 12}}>
                    <Paragraph fontSize={12} style={{color: '#B1B1B1'}}>
                      {orderDetail?.store?.name ?? 'N?A'}
                    </Paragraph>
                    <Paragraph
                      fontWeight="500"
                      fontSize={15}
                      style={{
                        color: '#494949',
                        marginVertical: 5,
                      }}>
                      {orderDetail?.product_title ?? ''}
                    </Paragraph>

                    <Paragraph
                      style={{
                        color: '#1E89DD',
                      }}
                      fontSize={19}
                      fontWeight="800">
                      {`${NAIRA} ${orderDetail?.product_price ?? 0}`}
                    </Paragraph>
                  </View>
                </FlexedView>
              </FlexedView>
            </View>

            <AppButton
              onPress={completePayment}
              variant="primary"
              text="Complete Pending Order"
            />
          </View>
          <View>
            <Spacer />
            <Paragraph>Same products under this order</Paragraph>
            <Spacer />

            {relatedOrders?.length
              ? relatedOrders?.map((or: any, ind: number) => (
                  <FlexedView key={ind} justifyContent="space-between">
                    <FlexedView>
                      <Image
                        source={{uri: or?.preview_image ?? ''}}
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 20,
                        }}
                      />

                      <View style={{flexDirection: 'column', marginLeft: 12}}>
                        <Paragraph fontSize={12} style={{color: '#B1B1B1'}}>
                          {or?.store?.name ?? 'N?A'}
                        </Paragraph>
                        <Paragraph
                          fontWeight="500"
                          fontSize={15}
                          style={{
                            color: '#494949',
                            marginVertical: 5,
                          }}>
                          {or?.product_title}
                        </Paragraph>

                        <Paragraph
                          style={{
                            color: '#1E89DD',
                          }}
                          fontSize={19}
                          fontWeight="800">
                          {`${NAIRA} ${or?.product_price}`}
                        </Paragraph>
                      </View>
                    </FlexedView>
                  </FlexedView>
                ))
              : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PendingOrderDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EEEEF1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  cancel: {
    backgroundColor: colors.white,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 10,
  },
});
