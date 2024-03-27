import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlexedView, PressableView} from '@components/view';
import colors from '@utility/colors';
import {Paragraph} from '@components/text/text';

const ProductCard = () => {
  return (
    <PressableView
      style={{
        backgroundColor: colors.white,
        height: 150,
        marginVertical: 12,
        width: '100%',
        marginRight: 12,
      }}>
      <FlexedView style={{padding: 20}}>
        <Paragraph fontWeight="400" fontSize={15} color={colors.white}>
          Top Seller
        </Paragraph>
      </FlexedView>
    </PressableView>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
