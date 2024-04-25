import {Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Paragraph} from '@components/text/text';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import {Pressable} from 'react-native';
import {Image} from 'react-native';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import CodeInputField from '@components/code-field';
import Header from '@components/header';

const SaleDetail = () => {
  const [inputCodeValue, setInputCodeValue] = React.useState(['', '', '', '']);
  const [code, setCode] = React.useState<string[]>(['8', '3', '9', '1']);
  return (
    <BaseView>
      <ViewContainer style={{flex: 1}}>
        <Header title="My Sales" />
        <Spacer />
        <View>
          <Paragraph fontSize={12}>
            Payment has been made for your item. Buyer is enroute to your
            location.
          </Paragraph>
          <Spacer height={5} />
          <Paragraph fontSize={13} fontWeight="600" color={colors.primary}>
            Input the code from the buyer to finalize purchase.
          </Paragraph>

          <Spacer />

          <CodeInputField setInputCode={setInputCodeValue} />

          <Spacer />
        </View>
      </ViewContainer>
    </BaseView>
  );
};

export default SaleDetail;

const styles = StyleSheet.create({});
