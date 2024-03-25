import React from 'react';
import {View} from 'react-native';
import {ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';

const HomeScreen: React.FC = ({}) => {
  return (
    <View style={{flex: 1}}>
      <ViewContainer>
        <Paragraph>Home scfen</Paragraph>
      </ViewContainer>
    </View>
  );
};

export default HomeScreen;
