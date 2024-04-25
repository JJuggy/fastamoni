import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  BaseView,
  Divider,
  FlexedView,
  Spacer,
  ViewContainer,
} from '@components/view';
import colors from '@utility/colors';
import Header from '@components/header';
import data from '../../data';
import {Paragraph} from '@components/text/text';
import {heightPixel} from '@utility/pxToDpConvert';
import {useNavigation} from '@react-navigation/native';

const TransactionHistory = () => {
  const {transactionHistory} = data;
  const {navigate} = useNavigation();
  return (
    <BaseView>
      <ViewContainer>
        <Header title="Transaction History" />
        <Spacer height={15} />
      </ViewContainer>
      <Divider height={4} />
      <FlatList
        data={transactionHistory}
        renderItem={({item, index}) => (
          <View key={index}>
            <ViewContainer>
              <FlexedView style={styles.item} justifyContent="space-between">
                <View>
                  <Paragraph fontSize={17}>{item.name}</Paragraph>
                  <Paragraph color={colors.gray} mt={8}>
                    {item.date}
                  </Paragraph>
                </View>
                <View>
                  <Paragraph
                    color={
                      item.status === 'cancelled' ? colors.red : colors.gray
                    }
                    fontSize={15}
                    textAlign="right">
                    {item.status === 'cancelled' ? item.status : item.order}
                  </Paragraph>
                  <Pressable
                    onPress={() => {
                      // Navigate to TransactionDetail
                      navigate('TransactionDetail');
                    }}>
                    <Paragraph
                      color={colors.gray}
                      fontWeight="400"
                      mt={8}
                      textAlign="right">
                      View Details
                    </Paragraph>
                  </Pressable>
                </View>
              </FlexedView>
            </ViewContainer>
          </View>
        )}
      />
    </BaseView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  item: {
    paddingVertical: heightPixel(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
