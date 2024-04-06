import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {FlexedView, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import Header from '@components/header';
import sharedImages from '@utility/sharedImages';

const ReadMoreFaq = () => {
  const route = useRoute();
  const {question, answer} = route.params as {question: string; answer: string};

  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="FAQs" />
        <View style={{marginTop: 20}}>
          <Paragraph color="#0E3F66" fontSize={18} fontWeight="600">
            {question}
          </Paragraph>
          <Paragraph
            fontSize={13}
            style={{
              marginVertical: 12,
            }}>
            {answer}
          </Paragraph>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 35,
          }}>
          <Paragraph fontWeight="700" fontSize={17}>
            Was this helpful?
          </Paragraph>
          <FlexedView style={{paddingHorizontal: 12, marginTop: 8}}>
            <Image
              source={sharedImages.icons.thumbsUp}
              style={{height: 20, width: 20, marginRight: 15}}
            />
            <Image
              source={sharedImages.icons.thumbsDown}
              style={{height: 20, width: 20}}
            />
          </FlexedView>
        </View>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default ReadMoreFaq;

const styles = StyleSheet.create({});
