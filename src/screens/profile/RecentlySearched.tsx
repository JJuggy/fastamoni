import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {FlexedView, ViewContainer} from '@components/view';
import Header from '@components/header';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';

const RecentlySearched = () => {
  const [recentlySearched, setRecentlySearched] = React.useState([
    'Iphone',
    'Brown Table',
    'Generator',
    'Laptop',
    'Hisense Tv',
  ]);
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="Recently Searched" />
        <ScrollView style={{height: '100%', marginTop:20}}>
          {recentlySearched.map((item, index) => (
            <FlexedView
              key={index}
              justifyContent="space-between"
              style={{
                paddingVertical: 10,
                borderRadius: 5,
              }}>
              <Paragraph color="#131313">{item}</Paragraph>
              <Image source={sharedImages.icons.recent} style={styles.icons} />
            </FlexedView>
          ))}
        </ScrollView>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default RecentlySearched;

const styles = StyleSheet.create({
  icons: {
    width: 20,
    height: 20,
  },
});
