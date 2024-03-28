import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import {windowHeight} from '@utility/helpers';
import {FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {HomeNavigatorParams} from 'src/types';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import {AppTextInput} from '@components/TextInput';
import {HomeScreenParam} from 'src/navigators/main/screens';

type routeParams = RouteProp<HomeScreenParam, 'StoreDetailsScreen'>;

const StoreDetailsScreen = () => {
  const {params} = useRoute<routeParams>();
  const {goBack} = useNavigation<HomeNavigatorParams>();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={sharedImages.storeBanner}
        style={[styles.banner, {height: windowHeight * 0.13}]}>
        <ViewContainer>
          <Header
            leftItem={
              <Pressable onPress={goBack} style={styles.backBtn}>
                <Image
                  tintColor={colors.white}
                  source={sharedImages.icons.back}
                  style={{width: 15, height: 10}}
                />
              </Pressable>
            }
          />
        </ViewContainer>
      </ImageBackground>
      <View style={{flex: 1, zIndex: 100}}>
        <Image style={styles.storeImg} source={sharedImages.storeImg} />
        <ScrollView>
          <ViewContainer style={{zIndex: 100}}>
            <Paragraph
              mt={65}
              fontSize={17}
              color={colors.black}
              fontWeight="600">
              Ojb Declutter
            </Paragraph>
          </ViewContainer>
          <ViewContainer>
            <Spacer />
            <FlexedView>
              <AppTextInput placeholder="Search any Product" />
            </FlexedView>
          </ViewContainer>
        </ScrollView>
      </View>
    </View>
  );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
  },
  banner: {
    justifyContent: 'center',
    zIndex: -10000,
  },
  backBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  storeImg: {
    width: heightPixel(80),
    height: heightPixel(80),
    borderRadius: heightPixel(80) / 2,
    resizeMode: 'cover',
    position: 'absolute',
    left: widthPixel(20),
    top: heightPixel(-20),
    zIndex: -1000,
  },
});
