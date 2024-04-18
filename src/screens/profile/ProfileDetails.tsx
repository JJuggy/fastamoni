/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FlexedView, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import Header from '@components/header';
import {useModal} from '@providers/DynamicModalProvider';
import {AppTextInput} from '@components/TextInput';
import {AppButton} from '@components/button';
import data from '../../data';
import {useLogout} from '@store/auth/hook';
import {useRoute} from '@react-navigation/native';
import {
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} from '@services/user';
const ProfileDetails = () => {
  const route = useRoute();
  const {detail} = route.params;
  const {show, close} = useModal();
  const ProfileDetailOptions = [
    {
      label: 'Account Name',
      detail: `${detail?.first_name} ${detail?.last_name}`,
    },
    {
      label: 'Phone Number',
      detail: `${detail?.phone_number != '' ? detail?.phone_number : '+234'} `,
    },

    {
      label: 'Email Address',
      detail: `${detail?.email} `,
    },
    {
      label: 'Password',
      detail: '*********',
    },
  ];
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="Profile Details" />
        <View>
          {ProfileDetailOptions.map((option, index) =>
            ProfileDetailView(option),
          )}
        </View>
      </ViewContainer>
      <Pressable
        onPress={() => {
          show({
            as: 'normal',
            content: <SignOutModal />,
          });
        }}>
        <FlexedView
          style={{
            backgroundColor: colors.white,
            padding: 6,
            paddingVertical: 25,
            marginTop: 8,
            paddingHorizontal: 12,
            borderBottomWidth: 0.2,
            borderBottomColor: '#737373',
          }}
          justifyContent="space-between">
          <Pressable
            style={{
              flexDirection: 'row',
            }}>
            <Image
              tintColor={'#737373'}
              style={{width: 20, height: 20, marginRight: 8}}
              source={sharedImages.icons.signOut}
            />
            <Paragraph
              color="#737373"
              style={{
                marginBottom: 3,
              }}
              fontWeight="500">
              Sign Out
            </Paragraph>
          </Pressable>
          <View>
            <Image
              tintColor={'#737373'}
              style={{width: 20, height: 20}}
              source={sharedImages.icons.caretRight}
            />
          </View>
        </FlexedView>
      </Pressable>
      <Pressable
        onPress={() => {
          show({
            as: 'normal',
            content: <DeleteAccountModal />,
          });
        }}>
        <FlexedView
          style={{
            backgroundColor: colors.white,
            padding: 6,
            paddingVertical: 25,
            paddingHorizontal: 12,
          }}
          justifyContent="space-between">
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              tintColor={'#737373'}
              style={{width: 20, height: 20, marginRight: 8}}
              source={sharedImages.icons.trash}
            />
            <Paragraph
              color="#F28F77"
              style={{
                marginBottom: 3,
              }}
              fontWeight="500">
              Delete Account
            </Paragraph>
          </View>
          <View>
            <Image
              tintColor={'#737373'}
              style={{width: 20, height: 20}}
              source={sharedImages.icons.caretRight}
            />
          </View>
        </FlexedView>
      </Pressable>
    </SafeAreaView>
  );
};
const ProfileDetailView = ({
  label,
  detail,
}: {
  label: string;
  detail: string;
}) => {
  const {show, close} = useModal();
  const handleShowEditModal = (tab: string) => {
    switch (tab) {
      case 'Account Name':
        show({
          as: 'normal',
          content: <AccountNameModal />,
        });
        break;
      case 'Phone Number':
        show({
          as: 'normal',
          content: <PhoneNumberModal />,
        });
        break;
      case 'Email Address':
        show({
          as: 'normal',
          content: <EmailAddressModal />,
        });
        break;
      case 'Password':
        show({
          as: 'normal',
          content: <EditPasswordModal />,
        });
        break;
      default:
        break;
    }
  };
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
      <View>
        <Pressable
          onPress={() => {
            handleShowEditModal(label);
          }}>
          <Image
            tintColor={'#737373'}
            style={{width: 20, height: 20}}
            source={sharedImages.icons.editPencil}
          />
        </Pressable>
      </View>
    </FlexedView>
  );
};
const AccountNameModal = ({refreshMtd}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [updateUserInfo, {isLoading}] = useUpdateUserInfoMutation();
  const handleInput = (field, value) => {
    if (field == 'First Name') {
      setFirstName(value);
    } else {
      setLastName(value);
    }
  };
  const handleSubmit = () => {
    console.log('the dets', firstName, lastName);

    updateUserInfo({
      first_name: firstName,
      last_name: lastName,
    })
      .unwrap()
      .then(() => {
        refreshMtd();
      });
  };
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
          value={firstName}
          onChangeText={text => handleInput('First Name', text)}
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          label="First Name"
        />
        <AppTextInput
          value={lastName}
          onChangeText={text => handleInput('Last Name', text)}
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          label="Last Name"
        />
        <AppButton
          isLoading={isLoading}
          onPress={() => {
            return handleSubmit();
          }}
          text="Update account name"
        />
      </View>
    </View>
  );
};
const PhoneNumberModal = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleSubmit = () => {
    console.log('the phone number', phoneNumber);
  };
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
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          label="Phone Number"
        />
        <AppButton onPress={handleSubmit} text="Update phone number" />
      </View>
    </View>
  );
};
const EmailAddressModal = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = () => {
    console.log('the email', email);
  };

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
          value={email}
          onChangeText={text => setEmail(text)}
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          label="Email Address"
        />
        <AppButton onPress={handleSubmit} text="Update email address" />
      </View>
    </View>
  );
};
const EditPasswordModal = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateUserPassword, {isLoading}] = useUpdateUserPasswordMutation();
  const handleSubmit = () => {
    updateUserPassword({
      old_password: oldPassword,
      new_password: newPassword,
    });
  };
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
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
          label="Password"
        />
        <AppTextInput
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          label="New Password"
        />
        <AppButton
          isLoading={isLoading}
          // disabled={oldPassword != confirmPassword || password == ''}
          onPress={handleSubmit}
          text="Update password"
        />
      </View>
    </View>
  );
};
const SignOutModal = () => {
  const logout = useLogout();
  const {close} = useModal();
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
        <Paragraph
          color="#0E3F66"
          style={{
            marginBottom: 6,
            textAlign: 'center',
          }}
          fontWeight="700">
          Are you sure you want to Sign Out?
        </Paragraph>
        <AppButton
          style={{marginVertical: 20}}
          text="Yes"
          onPress={() => {
            close();
            logout();
          }}
        />
        <AppButton
          style={{backgroundColor: '#BADEFB'}}
          text="No"
          onPress={close}
        />
      </View>
    </View>
  );
};
const DeleteAccountModal = () => {
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
        <Paragraph
          color="#661C17"
          style={{
            marginBottom: 6,
            textAlign: 'center',
          }}
          fontWeight="700">
          Are you sure you want to delete your account?
        </Paragraph>
        <AppButton
          textStyle={{
            color: 'white',
          }}
          style={{marginVertical: 20, backgroundColor: '#DE3D31'}}
          text="Yes"
        />
        <AppButton
          textStyle={{
            color: 'white',
          }}
          style={{backgroundColor: '#FCC5C1'}}
          text="No"
        />
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
