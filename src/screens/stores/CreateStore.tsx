/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import React, {useState} from 'react';
import colors from '@utility/colors';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import Header from '@components/header';
import {BaseView, FlexedView, Spacer} from '@components/view';
import {AppTextInput} from '@components/TextInput';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import {AppButton} from '@components/button';
import {pickImage} from '@utility/helpers';
import {useCreateStoreMutation} from '@services/stores';

const CreateStore = () => {
  const [create, {isLoading}] = useCreateStoreMutation();
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    description: '',
    logo: '',
    banner: '',
  });

  const updateStoreInfo = (field: string, value: string) => {
    if (field === 'description' && value.replace(/\s+/g, '').length > 100) {
      return;
    }
    setStoreInfo({
      ...storeInfo,
      [field]: value,
    });
  };

  const uploadImage = (type: 'logo' | 'banner') => {
    if (type === 'logo') {
      pickImage('upload', (err, img) => {
        if (!err) {
          console.log(img);

          setStoreInfo({...storeInfo, logo: img as string});
        }
      });
    } else {
      pickImage('upload', (err, img) => {
        if (!err) {
          setStoreInfo({...storeInfo, banner: img as string});
        }
      });
    }
  };

  const createStore = () => {
    const formD = new FormData();
    const keys = Object.keys(storeInfo);

    keys.forEach(key => {
      formD.append(key, storeInfo[key]);
    });

    create(formD)
      .unwrap()
      .then(res => {
        console.log(res.data, 'CREATE STORE RESPONSE');
      })
      .catch(err => {
        console.log(err, 'CREATE STORE RESPONSE');
      });
  };

  return (
    <BaseView background={colors.background}>
      <View style={styles.container}>
        <Header title="Create store" />
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 200}}
            showsVerticalScrollIndicator={false}>
            <Spacer />
            <FlexedView style={styles.topV}>
              <View style={styles.imageV}>
                {!storeInfo.logo ? (
                  <Image source={sharedImages.icons.person_round} />
                ) : (
                  <Image
                    source={{uri: storeInfo.logo}}
                    style={styles.logo}
                    resizeMode="cover"
                  />
                )}
              </View>
              <View>
                <Paragraph>Upload logo</Paragraph>
                <Spacer />
                <FlexedView>
                  <AppButton
                    variant="primary"
                    text="Upload image"
                    style={styles.btn}
                    onPress={() => uploadImage('logo')}
                  />
                  <AppButton
                    variant="secondary"
                    text="Remove"
                    style={[styles.btn, styles.removeBtn]}
                  />
                </FlexedView>
              </View>
            </FlexedView>
            <Spacer />
            <AppTextInput
              label="Store Name"
              value={storeInfo.name}
              onChangeText={text => updateStoreInfo('name', text)}
            />
            {/*
            <AppTextInput
              label="Store URL"
              placeholder="gfttc"
              value={storeInfo.store_url}
              onChangeText={text => updateStoreInfo('store_url', text)}
            />
            */}
            <AppTextInput
              label="Store Description"
              multiline
              placeholder="Tell your us about your store"
              containerStyle={{marginBottom: 5}}
              value={storeInfo.description}
              onChangeText={text => updateStoreInfo('description', text)}
            />
            <Paragraph textAlign="right">{`${
              storeInfo.description.replace(/\s+/g, '').length ?? 0
            }/100`}</Paragraph>
            <Spacer />
            <Paragraph>Store Banner</Paragraph>
            <View style={styles.bannerV}>
              {!storeInfo.banner ? (
                <AppButton
                  variant="secondary"
                  text="Choose a banner"
                  onPress={() => uploadImage('banner')}
                  style={[styles.btn, styles.removeBtn]}
                />
              ) : (
                <Image
                  source={{uri: storeInfo.banner}}
                  resizeMode="cover"
                  style={styles.banner}
                />
              )}
            </View>
            <Spacer height={35} />
            <AppButton
              variant="primary"
              text="Create Store"
              onPress={createStore}
              isLoading={isLoading}
            />
          </ScrollView>
        </View>
      </View>
    </BaseView>
  );
};

export default CreateStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPixel(20),
  },
  topV: {
    alignItems: 'flex-start',
    marginTop: 20,
  },
  logo: {
    height: heightPixel(80),
    width: heightPixel(80),
    borderRadius: heightPixel(150) / 2,
  },
  imageV: {
    height: heightPixel(80),
    width: heightPixel(80),
    borderRadius: heightPixel(150) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 20,
    overflow: 'hidden',
    zIndex: 1000,
  },
  btn: {
    paddingHorizontal: 20,
    height: heightPixel(40),
    borderRadius: 12,
  },
  removeBtn: {
    marginLeft: 10,
    borderWidth: 0,
  },
  bannerV: {
    borderWidth: 1,
    borderStyle: 'dashed',
    height: heightPixel(200),
    borderRadius: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
