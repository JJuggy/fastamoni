import {Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import {ButtonGroup} from '@rneui/themed';
import {View} from 'react-native';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';
import {Pressable} from 'react-native';
import data from '../../data';
import {ScrollView} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
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
        <View
          style={{
            maxWidth: '70%',
            alignSelf: 'center',
            marginVertical: 6,
          }}>
          <Paragraph
            color="black"
            fontWeight="400"
            fontSize={12}
            style={{textAlign: 'center'}}>
            We have listed the most frequently asked questions below.
          </Paragraph>
        </View>
      </ViewContainer>
      {selectedIndex === 0 ? <BuyerFaq /> : <SellersFaq />}
    </BaseView>
  );
};
const BuyerFaq = () => {
  const {buyersFaq} = data;
  return (
    <ScrollView
      style={{
        height: '100%',
      }}>
      {buyersFaq.map((faq, index) => (
        <FaqView key={index} question={faq.question} answer={faq.answer} />
      ))}
    </ScrollView>
  );
};
const SellersFaq = () => {
  const {sellersFaq} = data;
  return (
    <ScrollView
      style={{
        height: '100%',
      }}>
      {sellersFaq.map((faq, index) => (
        <FaqView key={index} question={faq.question} answer={faq.answer} />
      ))}
    </ScrollView>
  );
};

const FaqView = ({question, answer}: {question: string; answer: string}) => {
  type FaqViewParams = {
    ReadMoreFaq: {
      question: string;
      answer: string;
    };
  };
  type YourNavigationType = NavigationProp<FaqViewParams>;
  const navigation: YourNavigationType = useNavigation();
  return (
    <FlexedView
      style={{
        backgroundColor: colors.white,
        padding: 6,
        paddingVertical: 25,
        marginTop: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 0.2,
        borderBottomColor: '#737373',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      justifyContent="space-between">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          tintColor={'#131313'}
          style={{width: 25, height: 25, marginRight: 8}}
          source={sharedImages.icons.circleQuestion}
        />
        <Paragraph
          color="#0E3F66"
          style={{
            marginBottom: 3,
          }}
          fontSize={15}
          fontWeight="700">
          {question}
        </Paragraph>
      </View>
      <Paragraph fontSize={12} style={{marginVertical: 6}}>
        {answer}
      </Paragraph>
      <Pressable
        style={{flexDirection: 'row'}}
        onPress={() => {
          navigation.navigate('ReadMoreFaq', {
            question,
            answer,
          });
        }}>
        <Paragraph color="#0E3F66" fontSize={12} fontWeight="700" style={{}}>
          Read More
        </Paragraph>
        <Image
          tintColor={'#131313'}
          source={sharedImages.icons.arrowRight}
          style={{width: 15, height: 15}}
        />
      </Pressable>
    </FlexedView>
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
