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
import colors from '@utility/colors';
import Header from '@components/header';
import sharedImages from '@utility/sharedImages';
import {useRoute} from '@react-navigation/native';

const ProductDetails = () => {
  const route = useRoute();
  type ProductDetailsRoute = {
    details: {
      storeName: string;
    };
  };

  const {details} = route.params as ProductDetailsRoute;
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
        rightItem={
          <FlexedView>
            <Image
              style={styles.icon}
              source={sharedImages.icons.search}
              tintColor={'white'}
            />
            <Image
              style={styles.icon}
              source={sharedImages.icons.cart}
              tintColor={'white'}
            />
          </FlexedView>
        }
        title={details.storeName}
      />
      <ViewContainer style={{backgroundColor: '#F5F5F5', height: '100%'}}>
        <ScrollView></ScrollView>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
});
