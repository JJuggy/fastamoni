import React from 'react';
import {View} from 'react-native';
import {BaseView, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';

const HomeScreen: React.FC = ({}) => {
  return (
    <BaseView>
      <View style={{flex: 1}}>
        <ViewContainer>
          <Paragraph>Home scfen</Paragraph>
        </ViewContainer>
      </View>
    </BaseView>
  );
};

export default HomeScreen;
