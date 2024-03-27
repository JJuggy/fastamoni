import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlexedView} from '@components/view';
import colors from '@utility/colors';
import LinearGradient from 'react-native-linear-gradient';
import {Paragraph} from '@components/text/text';

const DealCard = () => {
  return (
    <LinearGradient
      colors={['#FF9A6C', '#D7A22B']}
      style={{
        backgroundColor: colors.primary,
        height: 180,
        borderRadius: 15,
        marginVertical: 12,
        width: 400,
        marginRight: 12,
      }}>
      <FlexedView style={{padding: 20}}>
        <Paragraph
          fontWeight="400"
          fontSize={15}
          style={{
            color: colors.white,
          }}>
          Top Seller
        </Paragraph>
      </FlexedView>
    </LinearGradient>
  );
};

export default DealCard;

const styles = StyleSheet.create({});
