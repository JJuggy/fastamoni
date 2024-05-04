import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image} from 'react-native';
import {Paragraph} from '@components/text/text';
import {FlexedView, ViewContainer} from '@components/view';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '@components/header';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';

const AllCategoriesScreen = () => {
  const route = useRoute();
  const {categories} = route.params as any;
  const navigation = useNavigation();
  console.log('the cat, ', categories);
  return (
    <SafeAreaView
      style={{
        // height: '100%',
        backgroundColor: colors.primary,
      }}>
      <Header
        tintColor="white"
        containerStyle={{
          backgroundColor: colors.primary,
          paddingHorizontal: 16,
          paddingVertical: 13,
        }}
        textColor="white"
        title={'All Categories'}
        rightItem={
          <FlexedView>
            <Image
              style={styles.icon}
              source={sharedImages.icons.search}
              tintColor={'white'}
            />
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Image
                style={styles.icon}
                source={sharedImages.icons.cart}
                tintColor={'white'}
              />
            </Pressable>
          </FlexedView>
        }
        // title={details.store.name}
      />
      <ViewContainer
        style={{backgroundColor: '#F5F5F5', height: '100%', paddingTop: 12}}>
        <FlatList
          data={categories}
          numColumns={3}
          renderItem={({item}) => <Category category={item} />}
          keyExtractor={item => item.id}
        />
      </ViewContainer>
    </SafeAreaView>
  );
};
interface ICategory {
  category: {
    name: string;
    icon: string;
  };
}
const Category = ({category}: ICategory) => {
  type Categoryscreenparams = {
    CategoryScreen: {
      category: string;
    };
  };
  type CategoryScreenProps = StackNavigationProp<Categoryscreenparams>;
  const navigation: CategoryScreenProps = useNavigation();

  return (
    <Pressable
      style={{
        width: 'auto',
        marginBottom: 25,
      }}
      onPress={() => {
        navigation.navigate('CategoryScreen', {category: category.name});
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: category.icon}}
          style={{
            width: 60,
            height: 60,
          }}
        />
        <Paragraph>{category.name}</Paragraph>
      </View>
    </Pressable>
  );
};

export default AllCategoriesScreen;

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
});
