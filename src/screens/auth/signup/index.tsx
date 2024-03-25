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

const SignUp: React.FC = () => {
  const {navigate} = useNavigation<nav<AuthScreenList>>();
  const [info, setInfo] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    businessName: '',
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
              label="Password"
              value={info.password}
              secureTextEntry
              onChangeText={text => onChangeText('password', text)}
              rightIcon={
                <Pressable
                  onPress={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }>
                  {showPassword ? (
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
              secureTextEntry
              onChangeText={text => onChangeText('confirmPassword', text)}
              rightIcon={
                <Pressable
                  onPress={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }>
                  {showPassword ? (
                    <Image source={sharedImages.icons.eyeOpen} />
                  ) : (
                    <Image source={sharedImages.icons.eyeOpen} />
                  )}
                </Pressable>
              }
            />
            <AppTextInput
              label="Bisuness Name (Optional)"
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
            <AppButton variant="primary" text="Create Account" />
            <Spacer height={30} />
            <Pressable onPress={() => navigate('SignIn')} style={styles.login}>
              <FlexedView>
                <Paragraph>Dont't have an account?</Paragraph>
                <Paragraph fontWeight="700">Register Now</Paragraph>
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
