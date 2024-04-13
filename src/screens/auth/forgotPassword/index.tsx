/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {AuthScreenList} from '../../../navigators/auth/authParamList';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import {AppButton} from '@components/button';
import {Paragraph} from '@components/text/text';
import {AppTextInput} from '@components/TextInput';
import sharedImages from '@utility/sharedImages';
import {useModal} from '@providers/DynamicModalProvider';
import colors from '@utility/colors';
import {useNavigation} from '@react-navigation/native';
import {widthPixel} from '@utility/pxToDpConvert';

type AuthScreenProps = StackNavigationProp<AuthScreenList>;

const ForgotPassword: React.FC = () => {
  const {goBack} = useNavigation<AuthScreenProps>();
  const [email, setEmail] = useState('');
  const {show, close} = useModal();

  const EmailSentModal = () => {
    return (
      <ViewContainer style={styles.modalV}>
        <Image source={sharedImages.mail} style={styles.mail} />
        <Spacer height={30} />
        <Paragraph textAlign="center">
          An Email has being sent to the Email Address provided by you. Check
          your inbox for instructions to reset your password
        </Paragraph>
        <Spacer height={40} />
        <AppButton
          variant="primary"
          text="Go back to Sign In"
          onPress={() => {
            close();
            goBack();
          }}
        />
        <Spacer height={100} />
      </ViewContainer>
    );
  };

  const submit = () => {
    show({
      as: 'fullscreen',
      content: <EmailSentModal />,
    });
  };

  return (
    <BaseView>
      <ViewContainer style={{flex: 1}}>
        <Spacer />
        <ScrollView>
          <FlexedView justifyContent="space-between">
            <Paragraph fontSize={23} lineHeight={26} fontWeight="700">
              Forgot Password?
            </Paragraph>
            <Pressable onPress={goBack}>
              <Paragraph>Back</Paragraph>
            </Pressable>
          </FlexedView>
          <Spacer height={10} />
          <Paragraph>Forgot your password? we got you covered?</Paragraph>
          <Spacer height={30} />

          <View>
            <AppTextInput
              value={email}
              placeholder="Enter your email address"
              onChangeText={text => setEmail(text)}
              leftIcon={<Image source={sharedImages.icons.collection} />}
            />
            <Spacer />
            <ViewContainer>
              <Paragraph textAlign="center">
                We will send you a message to reset a new password
              </Paragraph>
            </ViewContainer>

            <Spacer height={30} />
            <AppButton variant="primary" text="Submit" onPress={submit} />
          </View>
        </ScrollView>
      </ViewContainer>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  modalV: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  mail: {
    height: widthPixel(200),
    width: widthPixel(200),
    alignSelf: 'center',
  },
});

export default ForgotPassword;
