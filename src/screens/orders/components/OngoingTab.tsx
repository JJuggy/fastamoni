import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Paragraph} from '@components/text/text';
import {Spacer} from '@components/view';

const OngoingTab = () => {
  return (
    <SafeAreaView>
      <Spacer />
      <Paragraph>
        Provide the Seller with the code after inspection and your satisfied
        with the item, to finalize purchase
      </Paragraph>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({});
