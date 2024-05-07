import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native';
import {FlexedView, Spacer} from '@components/view';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';
import {AppButton} from '@components/button';
import {useNavigation} from '@react-navigation/native';
import {useCart} from '@store/cart/hook';
import OngoingItem from '@components/orders/ongoingItem';
import {useGetOrdersQuery} from '@services/orders';
import {NAIRA} from '@utility/naira';

const PendingTab = ({item}: any) => {
  const {navigate} = useNavigation();
  const cart = useCart();
  const {data} = useGetOrdersQuery('PENDING');
  const remainingPendingItems = data.data.filter(tm => tm._id != item._id);
  return (
    <SafeAreaView>
      <ScrollView>
        <Spacer />
        {item == undefined ? (
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
          <View>
            <View style={{flex: 1}}>
              <PendingOrder item={item} tab="Pending" />
              <AppButton variant="primary" text="Complete Pending Order" />
            </View>
            {/* <ScrollView style={{height: '90%'}}>
              {remainingPendingItems.map(() => (
                <View>
                  <PendingOrder item={item} tab="Pending" />
                </View>
              ))}
            </ScrollView> */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const PendingOrder = (item, tab) => {
  const {navigate} = useNavigation();
  return (
    <View>
      <Pressable
        // onPress={() => {
        //   navigate('OrderDetails', {
        //     tab: 'Pending',
        //     item,
        //   });
        // }}
        style={styles.container}>
        <FlexedView justifyContent="space-between">
          <FlexedView>
            {item?.product?.images?.length != 0 && (
              <Image
                source={{uri: item.item.preview_image}}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 20,
                }}
              />
            )}

            <View style={{flexDirection: 'column', marginLeft: 12}}>
              <Paragraph fontSize={12} style={{color: '#B1B1B1'}}>
                {item?.item.store?.name ?? 'N?A'}
              </Paragraph>
              <Paragraph
                fontWeight="500"
                fontSize={15}
                style={{
                  color: '#494949',
                  marginVertical: 5,
                }}>
                {item?.item.product_title}
              </Paragraph>

              <Paragraph
                style={{
                  color: '#1E89DD',
                }}
                fontSize={19}
                fontWeight="800">
                {`${NAIRA} ${item.item.product?.price}`}
              </Paragraph>
            </View>
          </FlexedView>
        </FlexedView>
      </Pressable>
    </View>
  );
};

export default PendingTab;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EEEEF1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
});
