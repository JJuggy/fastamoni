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

const ProfileDetails = () => {
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="Profile Details" />
        <View>
          {ProfileDetailOptions.map((option, index) => (
            <ProfileDetailView label={option.label} detail={option.detail} />
          ))}
        </View>
      </ViewContainer>
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
        <View
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
        </View>
        <View>
          <Image
            tintColor={'#737373'}
            style={{width: 20, height: 20}}
            source={sharedImages.icons.caretRight}
          />
        </View>
      </FlexedView>
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
            null;
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
const ProfileDetailOptions = [
  {
    label: 'Account Name',
    detail: 'Dada Taiwo',
  },
  {
    label: 'Phone Number',
    detail: '07060945202',
  },
  {
    label: 'Email Address',
    detail: 'dadataiwo@gmail.com',
  },
  {
    label: 'Password',
    detail: '*********',
  },
];


export default ProfileDetails;

const styles = StyleSheet.create({});
