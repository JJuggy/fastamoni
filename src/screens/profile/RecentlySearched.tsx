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
import {useGetSearchHistoryHistoryQuery} from '@services/history';

const RecentlySearched = () => {
  const {data: recentlySearched} = useGetSearchHistoryHistoryQuery();
  console.log('recentlySearched', recentlySearched);
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="Recently Searched" />

        {recentlySearched?.data.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}>
            <Image
              source={sharedImages.emptyCat}
              style={{
                height: 300,
                width: '100%',
                marginBottom: 40,
              }}
            />
            <Paragraph fontWeight="600" color="#B1B1B1">
              You have no recently searched product
            </Paragraph>
          </View>
        ) : (
          <ScrollView style={{height: '100%', marginTop: 20}}>
            {recentlySearched?.data.map((item: string, index: number) => (
              <FlexedView
                key={index}
                justifyContent="space-between"
                style={{
                  paddingVertical: 10,
                  borderRadius: 5,
                }}>
                <Paragraph color="#131313">{item.keyword}</Paragraph>
                <Image
                  source={sharedImages.icons.recent}
                  style={styles.icons}
                />
              </FlexedView>
            ))}
          </ScrollView>
        )}
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
