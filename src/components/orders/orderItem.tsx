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
import colors from '@utility/colors';
import {useModal} from '@providers/DynamicModalProvider';

const orderItem = ({orders}: {orders: Cartitem[]}) => {
  const dispatch = useDispatch();
  const [saveCartToServer, error] = useUpdateCartItemMutation();
  const {show, close} = useModal();
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
    if (type == 'inc' && item.product.stock <= item.quantity) {
      show({
        as: 'bottomSheet',
        content: (
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 26,
              paddingLeft: 12,
            }}>
            <Paragraph>This is more than the stock quantity</Paragraph>
          </View>
        ),
      });
      return;
    }
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

  const removeItem = (item: Cartitem) => {
    let ordersClone = [...orders];

    let newOrders = ordersClone.filter(o => o.productId !== item.productId);
    dispatch(updateCart({products: newOrders}));
    saveCartItems(newOrders);
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
            <View>
              <Pressable
                onPress={() => removeItem(order)}
                style={styles.closeIcon}>
                <Image
                  tintColor={colors.primary}
                  source={sharedImages.icons.close}
                />
              </Pressable>
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
            </View>
          </FlexedView>
        </View>
      </View>
    );
  });
};

export default orderItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EEEEF1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  closeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    marginBottom: 20,
  },
});
