/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppTextInput} from '@components/TextInput';
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import {useNavigation} from '@react-navigation/native';
import {FlexedView, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import {useGetProductsQuery} from '@services/products';
import DealCard from '@components/dealCard';
import HomeCard from '@screens/components/HomeCard';
import {
  useClearHistoryMutation,
  useGetSearchHistoryHistoryQuery,
} from '@services/history';
import {ActivityIndicator} from 'react-native';
import {err} from 'react-native-svg/lib/typescript/xml';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchResult, setSearchResult] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [debounceValue, setDebounceValue] = React.useState('');
  const {data, isLoading, refetch} = useGetProductsQuery(
    {title: debounceValue},
    {
      refetchOnFocus: false,
    },
  );
  const {data: recentSearchRes, refetch: refetchHistory} =
    useGetSearchHistoryHistoryQuery();
  const [clearHistory] = useClearHistoryMutation();

  const clearUserHistory = () => {
    clearHistory()
      .then(() => {
        refetchHistory();
      })
      .catch(error => {
        console.log(error, 'Clear error');
      });
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebounceValue(debounceValue);

      refetchHistory();
    }, 1000);

    return () => clearTimeout(debounce);
  }, [debounceValue]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" animating />
      </View>
    );
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <ViewContainer>
        <FlexedView
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 12,
          }}
          justifyContent="center">
          <AppTextInput
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              setDebounceValue(text);
            }}
            leftIcon={
              <Image
                source={sharedImages.icons.search}
                tintColor={'#B1B1B1'}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            }
            inputStyle={{
              backgroundColor: colors.white,
              borderWidth: 0,
            }}
            placeholder="Type your search here"
            placeholderTextColor={colors.gray}
            containerStyle={{
              width: '80%',
              marginBottom: 0,
            }}
          />
          <Pressable
            onPress={() => {
              navigation.goBack();
              setSearchText('');
            }}
            style={{
              flex: 1,
              marginLeft: 12,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Paragraph color="">Cancel</Paragraph>
          </Pressable>
        </FlexedView>
        {searchText === '' ? (
          <View>
            <FlexedView
              justifyContent="space-between"
              style={{marginVertical: 12}}>
              <Paragraph>Recently searched</Paragraph>
              <Pressable onPress={clearUserHistory}>
                <Image
                  source={sharedImages.icons.circleCancel}
                  style={styles.icons}
                />
              </Pressable>
            </FlexedView>
            <ScrollView
              style={{height: '100%'}}
              showsVerticalScrollIndicator={false}>
              {recentSearchRes?.data
                ?.slice(0, 6)
                ?.map((item: any, index: number) => (
                  <Pressable
                    onPress={() => {
                      setSearchText(item?.keyword);
                      setDebounceValue(item?.keyword);
                    }}>
                    <FlexedView
                      key={index}
                      justifyContent="space-between"
                      style={{
                        paddingVertical: 10,
                        borderRadius: 5,
                      }}>
                      <Paragraph>{item?.keyword}</Paragraph>
                      <Image
                        source={sharedImages.icons.recent}
                        style={styles.icons}
                      />
                    </FlexedView>
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        ) : (
          <FlatList
            data={data?.data}
            renderItem={({item, index}) => (
              <Pressable key={index} style={{flex: 1}}>
                <HomeCard
                  showCondition={false}
                  dealName={item.title}
                  storeName={item?.store?.[0]?.name}
                  // price={item?.price}
                  dealThumbnail={item?.images?.[0]?.url}
                  item={item}
                  {...item}
                />
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 300,
                }}>
                <Paragraph>No Products</Paragraph>
              </View>
            )}
          />
        )}
      </ViewContainer>
    </SafeAreaView>
  );
};
const ShowResult = () => {
  return (
    <FlexedView>
      <Text>Search Result</Text>
    </FlexedView>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  icons: {
    width: 20,
    height: 20,
  },
});
