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

const Sales = () => {
  return (
    <BaseView>
      <ViewContainer>
        <Header title="My Sales" />
        <Spacer height={15} />
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
});
