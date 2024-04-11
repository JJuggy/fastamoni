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
import {useLoginMutation} from '@services/auth';
import {useDispatch} from 'react-redux';
import {setCredential, setToken} from '@store/auth';
import {notifyError} from '@utility/notify';
const SignIn: React.FC = () => {
  const {navigate} = useNavigation<nav<AuthScreenList>>();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();
  const [info, setInfo] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    try {
      let resp = await login(info).unwrap();
      console.warn(info);
      dispatch(
        setCredential({
          user: {
            first_name: resp.data?.user?.first_name,
            last_name: resp.data?.user?.last_name,
            email: resp.data?.user?.email,
            id: resp.data?.user?._id,
            email_verified: resp.data?.user?.email_verified,
            storeId: resp.data?.user?.store?._id,
          },
        }),
      );
      dispatch(setToken(resp.data?.accessToken));
    } catch (error) {
      notifyError('Error', error?.data?.message);
      console.log(error?.data?.message, 'erroro');
    }
  };

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
              secureTextEntry={showPassword ? false : true}
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
            <AppButton
              onPress={handleLogin}
              isLoading={isLoading}
              variant="primary"
              text="Sign In"
            />
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
