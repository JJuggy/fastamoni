/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Paragraph} from '@components/text/text';
import {FlexedView} from '@components/view';
import sharedImages from '@utility/sharedImages';
import {Cartitem} from '@services/carts/interface';
import {useDispatch} from 'react-redux';
import {updateCart} from '@store/cart';
import {NAIRA} from '@utility/naira';
import {useUpdateCartItemMutation} from '@services/carts';

const OrderItem = ({orders}: {orders: Cartitem[]}) => {
  const dispatch = useDispatch();
  const [saveCartToServer] = useUpdateCartItemMutation();

  // console.log(orders, 'ORDERSSS');

  const saveCartItems = (items: Cartitem[]) => {
    const dataToSubmit = items.map(c => ({
      productId: c.product?._id,
      quantity: c.quantity,
      product_title: c.product_title,
    }));

    console.log(dataToSubmit, 'hwats to submoit');

    saveCartToServer({
      body: {
        items: dataToSubmit,
      },
    })
      .unwrap()
      .then(() => {
        console.log('saved');
      })
      .catch(err => {
        console.log(err, 'not saved');
      });
  };

  const updateItem = (type: 'inc' | 'dec', item: Cartitem) => {
    let itemToEdit = {...item};
    let ordersClone = [...orders];
    if (type === 'dec' && itemToEdit.quantity === 1) {
      console.log('enteered here');
      return;
    }

    itemToEdit.quantity =
      type === 'dec' ? itemToEdit.quantity - 1 : itemToEdit.quantity + 1;

    const index = ordersClone.findIndex(
      prod => prod.productId === itemToEdit.productId,
    );
    ordersClone[index] = itemToEdit;
    dispatch(updateCart({products: ordersClone}));
    saveCartItems(ordersClone);
  };

  return orders?.map((order: Cartitem, index: number) => {
    return (
      <View key={index}>
        <View style={styles.container}>
          <FlexedView justifyContent="space-between">
            <FlexedView>
              {order?.product?.images?.length != 0 && (
                <Image
                  source={{uri: order.product?.images?.[0]?.url}}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 20,
                  }}
                />
              )}

              <View style={{flexDirection: 'column', marginLeft: 12}}>
                <Paragraph fontSize={12} style={{color: '#B1B1B1'}}>
                  {order.product?.store?.[0]?.name ?? 'N?A'}
                </Paragraph>
                <Paragraph
                  fontWeight="500"
                  fontSize={15}
                  style={{
                    color: '#494949',
                    marginVertical: 5,
                  }}>
                  {order.product?.title}
                </Paragraph>
                <Paragraph
                  style={{
                    color: '#1E89DD',
                  }}
                  fontSize={19}
                  fontWeight="800">
                  {`${NAIRA} ${order.product?.price}`}
                </Paragraph>
              </View>
            </FlexedView>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 7,
                flexDirection: 'row',
                paddingHorizontal: 6,
                marginTop: 'auto',
                paddingVertical: 4,
              }}>
              <Pressable
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  updateItem('dec', order);
                }}>
                <Image
                  tintColor={'#1E89DD'}
                  style={{
                    width: 15,
                    height: 2,
                    marginRight: 5,
                  }}
                  source={sharedImages.icons.minus}
                />
              </Pressable>
              <Paragraph
                fontSize={16}
                style={{
                  marginHorizontal: 10,
                }}>
                {order.quantity}
              </Paragraph>
              <Pressable
                onPress={() => {
                  updateItem('inc', order);
                }}>
                <Image
                  tintColor={'#1E89DD'}
                  style={{
                    width: 16,
                    height: 16,
                    marginLeft: 5,
                  }}
                  source={sharedImages.icons.add}
                />
              </Pressable>
            </View>
          </FlexedView>
        </View>
      </View>
    );
  });
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EEEEF1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
