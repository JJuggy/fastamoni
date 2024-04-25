/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import colors from '@utility/colors';
import Header from '@components/header';
import data from '../../../data';
import {Paragraph} from '@components/text/text';
import {heightPixel} from '@utility/pxToDpConvert';
import {NAIRA} from '@utility/naira';
import sharedImages from '@utility/sharedImages';
import {HomeNavigatorParams} from 'src/types';
import {useNavigation} from '@react-navigation/native';

const Sales = () => {
  const {navigate} = useNavigation<HomeNavigatorParams>();

  const {orders}: any = data;
  return (
    <BaseView>
      <ViewContainer style={{flex: 1}}>
        <Header title="My Sales" />
        <Spacer />
        <ScrollView>
          {orders.map((order: any, index: number) => (
            <View key={index}>
              <Pressable
                style={styles.container}
                onPress={() => navigate('SaleDetail', {id: '23'})}>
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
                        {order?.product?.store?.[0]?.name ?? 'N?A'}
                      </Paragraph>
                      <Paragraph
                        fontWeight="500"
                        fontSize={15}
                        style={{
                          color: '#494949',
                          marginVertical: 5,
                        }}>
                        {order?.product?.title}
                      </Paragraph>
                      <FlexedView
                        style={{
                          marginVertical: 7,
                        }}>
                        <Image
                          style={{
                            width: 12,
                            height: 15,
                            marginRight: 5,
                            marginLeft: 3,
                          }}
                          source={sharedImages.icons.location}
                        />
                        <Paragraph
                          fontWeight="400"
                          fontSize={10}
                          style={{
                            color: 'black',
                          }}>
                          Pickup at 17, Abudu street, Abule oja, Lagos
                        </Paragraph>
                      </FlexedView>
                      <Paragraph
                        style={{
                          color: '#1E89DD',
                        }}
                        fontSize={19}
                        fontWeight="800">
                        {`${NAIRA} ${order?.product?.price}`}
                      </Paragraph>
                    </View>
                  </FlexedView>

                  <View
                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}>
                    {['', '', '', ''].map((cd, idx: number) => (
                      <View
                        style={{
                          borderRadius: 6,
                          width: 25,
                          height: 25,
                          backgroundColor: 'transparent',
                          marginLeft: 3,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderColor: '#4DABF5',
                          borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          {cd}
                        </Text>
                      </View>
                    ))}
                  </View>
                </FlexedView>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </ViewContainer>
    </BaseView>
  );
};

export default Sales;

const styles = StyleSheet.create({
  item: {
    paddingVertical: heightPixel(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  container: {
    width: '100%',
    backgroundColor: '#EEEEF1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
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
