import React, {useState} from 'react';
import {AuthScreenList} from '../../../navigators/auth/authParamList';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import {AppTextInput} from '@components/TextInput';
import {AppButton} from '@components/button';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'src/types';
import sharedImages from '@utility/sharedImages';

const SignIn: React.FC = () => {
  const {navigate} = useNavigation<nav<AuthScreenList>>();
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseView>
      <ViewContainer style={{flex: 1}}>
        <Spacer />
        <ScrollView>
          <Paragraph fontSize={23} lineHeight={26} fontWeight="700">
            Lets Sign you in
          </Paragraph>
          <Spacer height={10} />
          <Paragraph>Welcome Back, You have been missed</Paragraph>
          <Spacer height={30} />
          <View>
            <AppTextInput
              label="Email Address"
              value={info.email}
              onChangeText={text => setInfo({...info, email: text})}
            />
            <AppTextInput
              label="Password"
              secureTextEntry
              onChangeText={text => setInfo({...info, password: text})}
              rightIcon={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Image source={sharedImages.icons.eyeOpen} />
                  ) : (
                    <Image source={sharedImages.icons.eyeOpen} />
                  )}
                </Pressable>
              }
              value={info.password}
            />
            <Spacer />
            <Pressable
              onPress={() => navigate('ForgotPassword')}
              style={styles.forgetPassword}>
              <Paragraph>Forgot Password?</Paragraph>
            </Pressable>
            <Spacer height={30} />
            <AppButton variant="primary" text="Sign In" />
            <Spacer height={30} />
            <Pressable
              onPress={() => navigate('SignUp')}
              style={styles.register}>
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
  forgetPassword: {
    alignSelf: 'flex-end',
  },
  register: {
    alignSelf: 'center',
  },
});

export default SignIn;
