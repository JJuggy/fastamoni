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
import {AppButton} from '@components/button';
import {useMarkAsPickedUpMutation} from '@services/stores';
import {useModal} from '@providers/DynamicModalProvider';
import {useRoute} from '@react-navigation/native';

const SaleDetail = () => {
  const [inputCodeValue, setInputCodeValue] = React.useState(['', '', '', '']);
  const [markAsPickedUp] = useMarkAsPickedUpMutation();
  const route = useRoute();
  const {id} = route.params as {id: string};
  const {show, close} = useModal();
  const handleSubmit = () => {
    markAsPickedUp({
      orderId: id,
      verificationNo: inputCodeValue.join(''),
    })
      .unwrap()
      .then(res => {
        show({
          as: 'bottomSheet',
          content: (
            <View>
              <Paragraph>Your sale has been confirmed.</Paragraph>
            </View>
          ),
        });
      });
  };
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
          <AppButton
            onPress={() => {
              handleSubmit();
            }}
            text="Confirm"
          />
        </View>
      </ViewContainer>
    </BaseView>
  );
};

export default SaleDetail;

const styles = StyleSheet.create({});
