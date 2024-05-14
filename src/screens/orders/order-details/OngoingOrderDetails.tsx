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
import React from 'react';
import Header from '@components/header';
import {FlexedView, Spacer, ViewContainer} from '@components/view';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import {NAIRA} from '@utility/naira';
import {AppButton} from '@components/button';
import colors from '@utility/colors';
import {
  useGetOrderCodeQuery,
  useGetOrderDetailsRelatedQuery,
} from '@services/orders';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigatorParams} from 'src/types';

interface IProp {
  id: string;
}

const OngoingOrderDetails = ({id}: IProp) => {
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const {data} = useGetOrderDetailsRelatedQuery(id);
  const {data: orderCode} = useGetOrderCodeQuery(id);
  const orderDetail = data?.data?.order;
  const relatedOrders = data?.data?.related;
  return (
    <SafeAreaView>
      <ScrollView>
        <Spacer />
        <View>
          <View style={{flex: 1}}>
            <Paragraph fontSize={16}>
              Provide the Seller with the code after inspection and your
              satisfied with the item, to finalize purchase
            </Paragraph>
            <Spacer />
            <FlexedView
              style={{paddingHorizontal: 35}}
              justifyContent="space-between">
              {orderCode?.data.code.split('').map((cd, idx) => (
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
            <Spacer />
            <Pressable style={styles.cancel}>
              <Paragraph color={colors.red}>Cancel Order</Paragraph>
            </Pressable>
            <Spacer />
            <View>
              <Paragraph fontSize={16} fontWeight="600">
                Pickup details
              </Paragraph>
              <Spacer height={10} />
              <FlexedView>
                <Image
                  style={{width: 20, height: 20, marginRight: 10}}
                  source={sharedImages.icons.location}
                  tintColor={colors.gray}
                />
                <Paragraph>17, Abudu street, Abule ola Lagos</Paragraph>
              </FlexedView>
            </View>
            <Spacer />
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
                      {orderDetail?.product_title}
                    </Paragraph>

                    <Paragraph
                      style={{
                        color: '#1E89DD',
                      }}
                      fontSize={19}
                      fontWeight="800">
                      {`${NAIRA} ${orderDetail?.product_price}`}
                    </Paragraph>
                  </View>
                </FlexedView>
              </FlexedView>
            </View>
          </View>
          <View>
            <Spacer />
            <Paragraph fontSize={15} fontWeight="600">
              Same products under this order
            </Paragraph>
            <Spacer />

            {relatedOrders?.length ? (
              relatedOrders?.map((or: any, ind: number) => (
                <FlexedView key={ind} justifyContent="space-between">
                  <FlexedView>
                    <Image
                      source={{uri: or?.preview_image ?? null}}
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
            ) : (
              <>
                <Paragraph>No Related orders</Paragraph>
              </>
            )}
          </View>
          {/* <ScrollView style={{height: '90%'}}>
                {remainingPendingItems.map(() => (
                  <View>
                    <PendingOrder item={item} tab="Pending" />
                  </View>
                ))}
              </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OngoingOrderDetails;

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
