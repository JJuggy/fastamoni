import {Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import {ButtonGroup} from '@rneui/themed';
import {View} from 'react-native';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';

const Faq = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BaseView background={colors.background}>
      <ViewContainer>
        <Header title="FAQs" />
        <Spacer />
        <FlexedView justifyContent="center">
          <ButtonGroup
            buttons={['Buyer', 'Seller']}
            selectedIndex={selectedIndex}
            onPress={value => {
              setSelectedIndex(value);
            }}
            containerStyle={styles.btnGroup}
            selectedButtonStyle={styles.selectedBtn}
            textStyle={{color: colors.black}}
          />
        </FlexedView>
        <Spacer />
      </ViewContainer>
      {selectedIndex === 0 ? <BuyerFaq /> : <></>}
    </BaseView>
  );
};
const BuyerFaq = () => {
  return (
    <>
      <FlexedView
        style={{
          backgroundColor: colors.white,
          padding: 6,
          paddingVertical: 25,
          marginTop: 8,
          paddingHorizontal: 12,
          borderBottomWidth: 0.2,
          borderBottomColor: '#737373',
        }}
        justifyContent="space-between">
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            tintColor={'#131313'}
            style={{width: 20, height: 20, marginRight: 8}}
            source={sharedImages.icons.circleQuestion}
          />
          <Paragraph
            color="#131313"
            style={{
              marginBottom: 3,
            }}
            fontWeight="500">
            What is commission
          </Paragraph>
        </View>
        <View>
          <Image
            tintColor={'#131313'}
            style={{width: 20, height: 20}}
            source={sharedImages.icons.caretRight}
          />
        </View>
      </FlexedView>
      <FlexedView
        style={{
          backgroundColor: colors.white,
          padding: 6,
          paddingVertical: 25,
          paddingHorizontal: 12,
        }}
        justifyContent="space-between">
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            tintColor={'#131313'}
            style={{width: 20, height: 20, marginRight: 8}}
            source={sharedImages.icons.circleQuestion}
          />
          <Paragraph
            color="#131313"
            style={{
              marginBottom: 3,
            }}
            fontWeight="500">
            What is Refund?
          </Paragraph>
        </View>
        <View>
          <Image
            tintColor={'#131313'}
            style={{width: 20, height: 20}}
            source={sharedImages.icons.caretRight}
          />
        </View>
      </FlexedView>
    </>
  );
};

export default Faq;

const styles = StyleSheet.create({
  btnGroup: {
    width: '78%',
    backgroundColor: colors.border,
    borderRadius: 25,
    padding: 5,
    height: 50,
  },
  selectedBtn: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
});
