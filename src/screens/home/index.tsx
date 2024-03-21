/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform, View} from 'react-native';
import {ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import colors from '@utility/colors';

import Header from '@components/header';
import {ShoppingCartSimple} from 'phosphor-react-native';
const HomeScreen: React.FC = ({}) => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
      }}>
      <ViewContainer>
        <Header
          leftItem={
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 15,
              }}
            />
          }
          centerItem={
            <Paragraph fontWeight="700" fontSize={18}>
              PrimeBazaar
            </Paragraph>
          }
          rightItem={
            <View
              style={{
                backgroundColor: '#BADEFB',
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ShoppingCartSimple color="#176BAD" size={25} />
            </View>
          }
        />
      </ViewContainer>
    </View>
  );
};

export default HomeScreen;
