/* eslint-disable @typescript-eslint/no-unused-vars */
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import colors from '@utility/colors';
import {AppTextInput} from '@components/TextInput';
import {AppButton} from '@components/button';
import {AuthScreenList} from 'src/navigators/auth/authParamList';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'src/types';
import sharedImages from '@utility/sharedImages';
import {useSignUpMutation} from '@services/auth';
import {notifyError, notifySucess} from '@utility/notify';

const SignUp: React.FC = () => {
  const {navigate} = useNavigation<nav<AuthScreenList>>();
  const [signUp, {isLoading}] = useSignUpMutation();
  const navigation = useNavigation();
  const [info, setInfo] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const onChangeText = (field: string, value: string) => {
    setInfo({
      ...info,
      [field]: value,
    });
  };

  const submit = () => {
    if (info.password !== info.confirmPassword) {
      notifyError('Error', 'Please confirm that your password matches');
      return;
    }

    let dataToSubmit = {
      first_name: info.firstname,
      last_name: info.lastname,
      email: info.email,
      password: info.password,
      // business_name: info.businessName,
    };
    signUp(dataToSubmit)
      .unwrap()
      .then(res => {
        notifySucess('Success', 'Account created successfully');
        navigate('SignIn');
      })
      .catch(err => {
        console.log(err.data?.message);
      });
  };

  return (
    <BaseView>
      <ViewContainer style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}>
          <Paragraph fontSize={23} lineHeight={26} fontWeight="700">
            Let Register Account!
          </Paragraph>
          <Spacer height={10} />
          <Paragraph>Hello user, welcome to Primebazaar</Paragraph>
          <Spacer height={30} />
          <View>
            <AppTextInput
              label="Email Address"
              value={info.email}
              onChangeText={text => onChangeText('email', text)}
            />
            <AppTextInput
              label="First Name"
              value={info.firstname}
              onChangeText={text => onChangeText('firstname', text)}
            />
            <AppTextInput
              label="Last Name"
              value={info.lastname}
              onChangeText={text => onChangeText('lastname', text)}
            />
            <AppTextInput
              label="Phone Number"
              value={info.phoneNumber}
              onChangeText={text => onChangeText('phoneNumber', text)}
            />
            <AppTextInput
              label="Password"
              value={info.password}
              secureTextEntry={showPassword.password}
              onChangeText={text => onChangeText('password', text)}
              rightIcon={
                <Pressable
                  onPress={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }>
                  {showPassword.password ? (
                    <Image source={sharedImages.icons.eyeOpen} />
                  ) : (
                    <Image source={sharedImages.icons.eyeOpen} />
                  )}
                </Pressable>
              }
            />
            <AppTextInput
              label="Confirm Password"
              value={info.confirmPassword}
              secureTextEntry={showPassword.confirmPassword}
              onChangeText={text => onChangeText('confirmPassword', text)}
              rightIcon={
                <Pressable
                  onPress={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }>
                  {showPassword.confirmPassword ? (
                    <Image source={sharedImages.icons.eyeOpen} />
                  ) : (
                    <Image source={sharedImages.icons.eyeOpen} />
                  )}
                </Pressable>
              }
            />
            <AppTextInput
              label="Business Name (Optional)"
              value={info.businessName}
              onChangeText={text => onChangeText('businessName', text)}
            />
            <Spacer />
            <FlexedView>
              <Paragraph>I’ve read and accepted the </Paragraph>
              <Pressable>
                <Paragraph color={colors.primary} fontWeight="600">
                  terms and conditions{' '}
                </Paragraph>
              </Pressable>
            </FlexedView>
            <Spacer />
            <AppButton
              variant="primary"
              text="Create Account"
              disabled={
                !info.email ||
                !info.password ||
                !info.firstname ||
                !info.lastname ||
                !info.phoneNumber
              }
              onPress={submit}
              isLoading={isLoading}
            />
            <Spacer height={30} />
            <Pressable onPress={() => navigate('SignIn')} style={styles.login}>
              <FlexedView>
                <Paragraph>Already have an account?</Paragraph>
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Paragraph fontWeight="700">Sign In</Paragraph>
                </Pressable>
              </FlexedView>
            </Pressable>
          </View>
        </ScrollView>
      </ViewContainer>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  login: {
    alignSelf: 'center',
  },
});

export default SignUp;
