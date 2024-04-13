/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {AppTextInput} from '@components/TextInput';
import {AppButton} from '@components/button';
import Header from '@components/header';
import Radio from '@components/radio';
import {Paragraph} from '@components/text/text';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import {useCreateProductMutation} from '@services/products';
import colors from '@utility/colors';
import {pickImage} from '@utility/helpers';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';
import sharedImages from '@utility/sharedImages';
import React, {useMemo, useRef, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {states} from '../../data';
import DropdownSelect from '@components/dropDown/dropdown2';
import {useNavigation} from '@react-navigation/native';
import {DropDownItem, HomeNavigatorParams} from '../../types';
import mime from 'mime';
import {grades} from './options';
import {useGetCategoriesQuery} from '@services/categories';
import {notifyError, notifySucess} from '@utility/notify';

const PlaceOrder = () => {
  const {data} = useGetCategoriesQuery();
  const navigation = useNavigation();
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const [createProduct, {isLoading}] = useCreateProductMutation();
  const scrollRef = useRef<ScrollView>(null);
  const [itemInfo, setItemInfo] = useState({
    title: '',
    brand: '',
    grade: '',
    condition: '',
    images: [] as string[],
    price: '',

    state: '',
    lga: '',
    model_no: '',
    defects: '',
    additionalInfo: '',
    stock: '',
    category: {
      value: '',
      label: '',
    },
    pickup_address: '',
    quantity: '',
  });

  const categoryOptions = useMemo(() => {
    return data?.data?.map(ct => ({
      label: ct?.name,
      value: ct?._id,
    }));
  }, []);

  const resetState = () =>
    setItemInfo({
      title: '',
      brand: '',
      grade: '',
      condition: '',
      images: [],
      price: '',
      state: '',
      lga: '',
      model_no: '',
      defects: '',
      additionalInfo: '',
      stock: '',
      category: '',
      pickup_address: '',
      quantity: '',
    });

  const updateItemInfo = (field: string, value: string | DropDownItem) => {
    if (field === 'category') {
      setItemInfo({
        ...itemInfo,
        category: {
          value: (value as DropDownItem).value,
          label: (value as DropDownItem).label,
        },
      });
      return;
    }
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
  const stateList = useMemo(() => {
    return states.map(st => ({
      label: st.state,
      value: st.state,
    }));
  }, []);

  const lgaList = useMemo(() => {
    const lgas = states
      .filter(st => st.state === itemInfo.state)
      .map(st => st.lgas)
      .flat();

    return lgas.map(lg => ({
      label: lg,
      value: lg,
    }));
  }, [itemInfo.state]);

  const submitProduct = () => {
    const formD = new FormData();

    formD.append('condition', itemInfo.condition);
    formD.append('model_no', itemInfo.model_no);
    formD.append('grade', itemInfo.grade);
    formD.append('title', itemInfo.title);
    formD.append('description', itemInfo.additionalInfo);
    formD.append('price', itemInfo.price);
    formD.append('stock', itemInfo.quantity);
    formD.append('brand', itemInfo.brand);
    formD.append('category', itemInfo.category.value);
    formD.append('pickup_state', itemInfo.state);
    formD.append('pickup_city', itemInfo.lga);
    formD.append('pickup_address', itemInfo.pickup_address);
    formD.append('defects', itemInfo.defects);

    itemInfo.images.forEach(im => {
      const newImageUri = 'file://' + im.split('file:/').join('');
      formD.append('images[]', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      });
    });

    createProduct(formD)
      .unwrap()
      .then(res => {
        console.log(res.data, 'CREATE STORE RESPONSE');
        notifySucess('Success', 'Product created successfully');
        resetState();
        navigate('HomeScreen');
      })
      .catch(err => {
        notifyError('Error', 'Something broke');
        console.log(err, 'CREATE STORE RESPONSE');
      });
  };

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
                  placeholder="Brand"
                  value={itemInfo.brand}
                  onChangeText={text => updateItemInfo('brand', text)}
                />
                <AppTextInput
                  placeholder="Model"
                  value={itemInfo.model_no}
                  keyboardType="number-pad"
                  onChangeText={text => updateItemInfo('model_no', text)}
                />

                <DropdownSelect
                  value={itemInfo.condition}
                  onSelect={sel => {
                    updateItemInfo('condition', sel.value);
                  }}
                  placeholder="Condition"
                  data={[
                    {label: 'NEW', value: 'NEW'},
                    {label: 'USED', value: 'USED'},
                  ]}
                />

                <View>
                  <AppTextInput
                    textLimit={20}
                    placeholder="Defects"
                    value={itemInfo.defects}
                    onChangeText={text => updateItemInfo('defects', text)}
                  />
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginTop: -18,
                    }}>
                    <Paragraph fontSize={12} color={colors.gray}>
                      {itemInfo.defects.length}/20
                    </Paragraph>
                  </View>
                </View>
                <View style={{marginTop: 12}}>
                  <AppTextInput
                    textLimit={20}
                    placeholder="Additional Info"
                    value={itemInfo.additionalInfo}
                    onChangeText={text =>
                      updateItemInfo('additionalInfo', text)
                    }
                  />
                  <View
                    style={{
                      alignItems: 'flex-end',
                      marginTop: -18,
                    }}>
                    <Paragraph fontSize={12} color={colors.gray}>
                      {itemInfo.additionalInfo.length}/20
                    </Paragraph>
                  </View>
                </View>
                <View style={{marginTop: 8}}>
                  <DropdownSelect
                    value={itemInfo.state}
                    onSelect={sel => {
                      updateItemInfo('state', sel.value);
                    }}
                    placeholder="State"
                    data={stateList}
                  />
                </View>

                <DropdownSelect
                  value={itemInfo.lga}
                  onSelect={sel => {
                    updateItemInfo('lga', sel.value);
                  }}
                  placeholder="City/District"
                  data={lgaList}
                />

                <Spacer height={20} />

                {/* <AppTextInput
                  placeholder="Address"
                  value={itemInfo.address}
                  onChangeText={text => updateItemInfo('address', text)}
                /> */}

                <DropdownSelect
                  value={itemInfo.grade}
                  onSelect={sel => {
                    updateItemInfo('grade', sel.value);
                  }}
                  placeholder="Grade"
                  data={grades}
                />
                <DropdownSelect
                  value={itemInfo.category.label}
                  onSelect={sel => {
                    updateItemInfo('category', sel);
                  }}
                  placeholder="Category"
                  data={categoryOptions}
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
                <AppTextInput placeholder="Commision 20%" editable={false} />
                <AppTextInput
                  placeholder="Pickup address"
                  value={itemInfo.pickup_address}
                  onChangeText={text => updateItemInfo('pickup_address', text)}
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
                    onPress={() => {
                      navigation.goBack();
                    }}
                    variant="secondary"
                    text="Cancel"
                    style={styles.btn}
                  />
                  <AppButton
                    variant="primary"
                    text="Upload"
                    style={styles.btn}
                    onPress={submitProduct}
                    isLoading={isLoading}
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
