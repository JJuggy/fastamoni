/* eslint-disable react-native/no-inline-styles */
import {AppTextInput} from '@components/TextInput';
import {AppButton} from '@components/button';
import Header from '@components/header';
import Radio from '@components/radio';
import {Paragraph} from '@components/text/text';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import colors from '@utility/colors';
import {pickImage} from '@utility/helpers';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import sharedImages from '@utility/sharedImages';
import React, {useRef, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';

const PlaceOrder = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [itemInfo, setItemInfo] = useState({
    title: '',
    desc: '',
    location: '',
    grade: '',
    quantity: '',
    images: [] as string[],
    price: '',
    address: '',
  });

  const updateItemInfo = (field: string, value: string) => {
    setItemInfo({
      ...itemInfo,
      [field]: value,
    });
  };

  const uploadImage = () => {
    pickImage('upload', (err, img) => {
      if (!err) {
        let imgs = [...itemInfo.images, img as string];
        setItemInfo({
          ...itemInfo,
          images: imgs,
        });
      }
    });
  };

  const deleteImg = (img: string) => {
    const imgs = itemInfo.images.filter(im => im !== img);
    setItemInfo(prev => ({
      ...prev,
      images: imgs,
    }));
  };

  const onContentSizeChanged = () => scrollRef.current?.scrollToEnd();

  return (
    <BaseView background={colors.app_bg}>
      <ViewContainer style={{flex: 1}}>
        <Header title="Upload item" />
        <Spacer />
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 150}}
            showsVerticalScrollIndicator={false}>
            <ViewContainer style={styles.container}>
              <View>
                <FlexedView>
                  <Paragraph fontSize={18} fontWeight="700">
                    Add new files
                  </Paragraph>
                </FlexedView>
                <Spacer />

                <Pressable onPress={uploadImage} style={styles.bannerV}>
                  <Image source={sharedImages.icons.file} />
                  <Spacer height={10} />
                  <Paragraph textAlign="center" fontWeight="600">
                    Drag & Drop or{' '}
                    <Paragraph color={colors.primary}>choose </Paragraph>
                    file to file to upload
                  </Paragraph>
                  <Paragraph mt={4}>Select JPEG,SVG or PNG</Paragraph>
                </Pressable>
                <Spacer height={15} />
                {itemInfo.images.length ? (
                  <ScrollView
                    ref={scrollRef}
                    onContentSizeChange={onContentSizeChanged}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {itemInfo.images.map(img => (
                      <View style={styles.img} key={img}>
                        <Pressable
                          onPress={() => deleteImg(img)}
                          style={styles.deleteImg}>
                          <Image source={sharedImages.icons.close} />
                        </Pressable>
                        <Image
                          source={{uri: img}}
                          style={{width: '100%', height: '100%'}}
                          resizeMode="cover"
                        />
                      </View>
                    ))}
                  </ScrollView>
                ) : null}
              </View>
              <Spacer />
              <View>
                <AppTextInput
                  placeholder="Title"
                  value={itemInfo.title}
                  onChangeText={text => updateItemInfo('title', text)}
                />
                <AppTextInput
                  placeholder="Description"
                  value={itemInfo.desc}
                  onChangeText={text => updateItemInfo('desc', text)}
                />
                <AppTextInput
                  placeholder="Quantity"
                  value={itemInfo.quantity}
                  keyboardType="number-pad"
                  onChangeText={text => updateItemInfo('quantity', text)}
                />
                <AppTextInput
                  leftIcon={
                    <Image
                      source={sharedImages.icons.naira}
                      style={{height: 15, width: 15}}
                      tintColor={colors.gray}
                    />
                  }
                  placeholder="Price"
                  value={itemInfo.price}
                  keyboardType="number-pad"
                  onChangeText={text => updateItemInfo('price', text)}
                />
                <AppTextInput
                  editable={false}
                  placeholder="Commission 20%"
                  keyboardType="number-pad"
                />
                <AppTextInput
                  placeholder="Pickup address"
                  value={itemInfo.address}
                  onChangeText={text => updateItemInfo('address', text)}
                />
                <FlexedView>
                  <Radio
                    selected={true}
                    color={colors.primary}
                    onPress={() => {}}
                  />
                  <Paragraph
                    style={{flex: 1, marginLeft: 10}}
                    fontSize={12}
                    color={colors.gray}>
                    A 20% commission would be charged upon successful sale of
                    this product
                  </Paragraph>
                </FlexedView>
              </View>
              <Spacer />
              <ViewContainer>
                <FlexedView justifyContent="space-between">
                  <AppButton
                    variant="secondary"
                    text="Cancel"
                    style={styles.btn}
                  />
                  <AppButton
                    variant="primary"
                    text="Upload"
                    style={styles.btn}
                  />
                </FlexedView>
              </ViewContainer>
              <Spacer height={25} />
            </ViewContainer>
          </ScrollView>
        </View>
      </ViewContainer>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '47%',
  },
  img: {
    width: widthPixel(100),
    height: widthPixel(100),
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: widthPixel(15),
  },
  deleteImg: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 100,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 8,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: heightPixel(15),
  },
  bannerV: {
    borderWidth: 1,
    borderStyle: 'dashed',
    height: heightPixel(150),
    borderRadius: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
});

export default PlaceOrder;
