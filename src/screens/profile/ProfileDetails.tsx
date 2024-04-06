import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {FlexedView, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import Header from '@components/header';
import {useModal} from '@providers/DynamicModalProvider';
import {AppTextInput} from '@components/TextInput';
import {AppButton} from '@components/button';
import data from '../../data';
const ProfileDetails = () => {
  const {ProfileDetailOptions} = data;
  const {show, close} = useModal();
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
const AccountNameModal = () => {
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
          value="Dada"
          label="First Name"
        />
        <AppTextInput
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          value="Dada"
          label="Last Name"
        />
        <AppButton text="Update account name" />
      </View>
    </View>
  );
};
const PhoneNumberModal = () => {
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
          value="Dada"
          label="Phone Number"
        />
        <AppButton text="Update phone number" />
      </View>
    </View>
  );
};
const EmailAddressModal = () => {
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
          value="JuggyJs@gmail.com"
          label="Email Address"
        />
        <AppButton text="Update email address" />
      </View>
    </View>
  );
};
const EditPasswordModal = () => {
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
          value="********"
          label="Password"
        />
        <AppTextInput
          inputStyle={{
            backgroundColor: '#E1E1E1',
          }}
          labelStyle={{
            fontWeight: '700',
          }}
          value=" ********"
          label="Confirm Password"
        />
        <AppButton text="Update password" />
      </View>
    </View>
  );
};
const SignOutModal = () => {
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
        <AppButton style={{marginVertical: 20}} text="Yes" />
        <AppButton style={{backgroundColor: '#BADEFB'}} text="No" />
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
