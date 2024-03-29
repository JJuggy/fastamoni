import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppTextInput} from '@components/TextInput';
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import {useNavigation} from '@react-navigation/native';
import {FlexedView, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchResult, setSearchResult] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [recentlySearched, setRecentlySearched] = React.useState([
    'Iphone',
    'Brown Table',
    'Generator',
    'Laptop',
    'Hisense Tv',
  ]);
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
        {searchResult.length === 0 || searchText === '' ? (
          <View>
            <FlexedView
              justifyContent="space-between"
              style={{marginVertical: 12}}>
              <Paragraph>Recently searched</Paragraph>
              <Pressable
                onPress={() => {
                  setRecentlySearched([]);
                  //call api to clear recent search
                }}>
                <Image
                  source={sharedImages.icons.circleCancel}
                  style={styles.icons}
                />
              </Pressable>
            </FlexedView>
            <ScrollView style={{height: '100%'}}>
              {recentlySearched.map((item, index) => (
                <FlexedView
                  key={index}
                  justifyContent="space-between"
                  style={{
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}>
                  <Paragraph>{item}</Paragraph>
                  <Image
                    source={sharedImages.icons.recent}
                    style={styles.icons}
                  />
                </FlexedView>
              ))}
            </ScrollView>
          </View>
        ) : (
          <ShowResult />
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
