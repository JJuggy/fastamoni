import React from 'react';
import {AuthScreenList} from '../../../navigators/auth/authParamList';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import {heightPixel} from '@utility/pxToDpConvert';
import {Paragraph} from '@components/text/text';
import {AppTextInput} from '@components/TextInput';
import {AppButton} from '@components/button';
import colors from '@utility/colors';
import {useNavigation} from '@react-navigation/native';
import {nav} from 'src/types';

const SignIn: React.FC = () => {
  const {navigate} = useNavigation<nav<AuthScreenList>>();

  return (
    <BaseView>
      <ScrollView style={{flex: 1}}>
        <ViewContainer style={{flex: 1}}>
          <ViewContainer style={styles.box}>
            <Paragraph textAlign="center">Login to your account</Paragraph>
            <Spacer />
            <AppTextInput placeholder="Enter your phone number" />
            <AppTextInput placeholder="Password" />
            <FlexedView>
              <Pressable onPress={() => navigate('SignUp')}>
                <Paragraph>Forgot password?</Paragraph>
              </Pressable>
            </FlexedView>
            <Spacer />
            <AppButton text="Login" variant="primary" />
            <Spacer height={25} />
            <Paragraph textAlign="center">Don't have an account ?</Paragraph>
            <Spacer height={25} />
          </ViewContainer>
        </ViewContainer>
      </ScrollView>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: heightPixel(70),
    height: heightPixel(70),
    alignSelf: 'center',
  },
  box: {
    paddingVertical: heightPixel(50),
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

export default SignIn;
