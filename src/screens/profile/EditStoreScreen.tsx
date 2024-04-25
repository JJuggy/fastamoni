import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {FlexedView, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import {Pressable} from 'react-native';
import sharedImages from '@utility/sharedImages';
import {Image} from 'react-native';
import colors from '@utility/colors';
import {useGetStoreQuery} from '@services/stores';
import {useAuth} from '@store/auth/hook';
import Header from '@components/header';
import {pickImage} from '@utility/helpers';
import {useModal} from '@providers/DynamicModalProvider';
import {AppTextInput} from '@components/TextInput';
import {AppButton} from '@components/button';
import {store} from '@store/index';
import Clipboard from '@react-native-clipboard/clipboard';

const EditStoreScreen = () => {
  const {user} = useAuth();
  const {data: storeDetail} = useGetStoreQuery(user?.storeId as string);
  const [storeInfo, setStoreInfo] = useState({
    name: storeDetail?.data.name,
    description: storeDetail?.data.description,
    logo: storeDetail?.data.logo.url,
    banner: storeDetail?.data.banner.url,
  });
  const {show, close} = useModal();
  const copyToClipboard = (text: string) => {
    console.warn('copying', text);
    Clipboard.setString(text);
  };
  const uploadImage = (type: 'logo' | 'banner') => {
    if (type === 'logo') {
      pickImage('upload', (err, img) => {
        if (!err) {
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
  const handleShowEditModal = (tab: string) => {
    switch (tab) {
      case 'Store Name':
        show({
          as: 'normal',
          content: (
            <EditStoreNameModal
              storeInfo={storeInfo}
              setStoreInfo={setStoreInfo}
              close={close}
            />
          ),
        });
      default:
        break;
    }
  };
  const EditStoreView = ({
    label,
    detail,
    icon,
    action,
  }: {
    label: string;
    detail: string;
    updateName?: () => void;
    updatePhoneNumber: () => void;
    updateEmail: () => void;
  }) => {
    return (
      <FlexedView
        style={{
          backgroundColor: colors.white,
          padding: 6,
          paddingVertical: 16,
          marginVertical: 8,
          paddingHorizontal: 12,
        }}
        justifyContent="space-between">
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Paragraph
            color="#737373"
            style={{
              marginBottom: 6,
            }}
            fontWeight="500">
            {label}
          </Paragraph>
          <Paragraph color="#737373" fontWeight="300">
            {detail}
          </Paragraph>
        </View>
        <Pressable
          onPress={() => {
            action(label);
          }}>
          <Image
            tintColor={'#737373'}
            style={{width: 20, height: 20}}
            source={icon}
          />
        </Pressable>
      </FlexedView>
    );
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <ViewContainer>
        <Header title="Store Details" />
        <EditStoreView
          icon={sharedImages.icons.editPencil}
          label={'Store Name'}
          detail={storeInfo.name}
          action={label => handleShowEditModal(label)}
        />
        <EditStoreView
          icon={sharedImages.icons.copy}
          label={'Store URL'}
          detail={storeDetail?.data.name}
          action={label => copyToClipboard('Store url ')}
        />
        <View
          style={{
            backgroundColor: colors.white,
            marginTop: 12,
          }}>
          <Paragraph style={{padding: 12}}>Store Banner</Paragraph>
          <Image
            source={{uri: storeInfo?.banner}}
            style={{
              width: '100%',
              height: 200,
              marginTop: 20,
            }}
          />
          <Pressable
            onPress={() => {
              uploadImage('banner');
            }}
            style={{
              padding: 12,
              backgroundColor: colors.white,
              alignItems: 'center',
              position: 'absolute',
              bottom: 10,
              left: '30%',
              borderRadius: 60,
            }}>
            <Paragraph color="#424242" fontWeight="500">
              Change the banner
            </Paragraph>
          </Pressable>
        </View>
        <FlexedView
          style={{
            marginTop: 20,
          }}>
          <Image
            tintColor={'#737373'}
            style={{width: 20, height: 20, marginRight: 8}}
            source={sharedImages.icons.trash}
          />
          <Paragraph color="#F6695E" fontWeight="500">
            Delete Store
          </Paragraph>
        </FlexedView>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default EditStoreScreen;

const EditStoreNameModal = ({setStoreInfo, storeInfo}: any) => {
  const [storeName, setStoreName] = useState('');
  const handleSubmit = () => {};

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: colors.white,
          width: '90%',
          borderRadius: 15,
          padding: 12,
          paddingVertical: 20,
        }}>
        <AppTextInput
          value={storeName}
          onChangeText={text => setStoreName(text)}
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          label="Store Name"
        />
        <AppButton onPress={handleSubmit} text="Update store name" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
