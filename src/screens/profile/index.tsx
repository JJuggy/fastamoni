/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import colors from '@utility/colors';
import {heightPixel, widthPixel} from '@utility/pxToDpConvert';

const ProfileScreen = () => {
  return (
    <BaseView>
      <ViewContainer>
        <Header title="Profile" />
      </ViewContainer>
      <View style={{flex: 1}}>
        <Spacer />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 150}}>
          <ViewContainer style={styles.profileH}>
            <FlexedView>
              <View>
                <Paragraph color={colors.white}>Welcome Optimuz</Paragraph>
                <Paragraph color={colors.white}>
                  optimuzbazza@gmail.com
                </Paragraph>
              </View>
            </FlexedView>
          </ViewContainer>
          <ViewContainer style={styles.grayHeading}>
            <FlexedView>
              <Image
                tintColor={colors.black}
                source={sharedImages.icons.shop}
                style={{
                  height: widthPixel(30),
                  width: widthPixel(30),
                  marginRight: 10,
                }}
              />
              <Paragraph fontSize={18}>My Stores</Paragraph>
            </FlexedView>
          </ViewContainer>
          <ViewContainer>
            {storesOption.map(op => (
              <Pressable key={op.label} style={styles.option}>
                <FlexedView justifyContent="space-between">
                  <FlexedView>
                    <Image
                      style={styles.optionIcon}
                      source={op.icon}
                      tintColor={colors.black}
                    />
                    <Paragraph>{op.label}</Paragraph>
                  </FlexedView>
                  <Image source={sharedImages.icons.chevron_right} />
                </FlexedView>
              </Pressable>
            ))}
          </ViewContainer>
          <ViewContainer style={styles.grayHeading}>
            <FlexedView>
              <Paragraph fontSize={18}>About</Paragraph>
            </FlexedView>
          </ViewContainer>
          <ViewContainer>
            {aboutOption.map(op => (
              <Pressable key={op.label} style={styles.option}>
                <FlexedView justifyContent="space-between">
                  <FlexedView>
                    <Image
                      style={styles.optionIcon}
                      source={op.icon}
                      tintColor={colors.black}
                    />
                    <Paragraph>{op.label}</Paragraph>
                  </FlexedView>
                  <Image source={sharedImages.icons.chevron_right} />
                </FlexedView>
              </Pressable>
            ))}
          </ViewContainer>
        </ScrollView>
      </View>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  profileH: {
    backgroundColor: colors.primary,
    paddingVertical: heightPixel(18),
  },
  grayHeading: {
    backgroundColor: colors.border,
    paddingVertical: heightPixel(20),
  },
  option: {
    paddingVertical: heightPixel(15),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  optionIcon: {
    width: heightPixel(25),
    height: heightPixel(25),
    marginRight: 15,
  },
});

export default ProfileScreen;

const storesOption = [
  {
    icon: sharedImages.icons.person_round_black,
    label: 'Profile Details',
    url: 'ProfileDetails',
  },
  {
    icon: sharedImages.icons.shop,
    label: 'Store Details',
    url: 'StoreDetails',
  },
  {
    icon: sharedImages.icons.wallet,
    label: 'Wallet',
    url: 'Wallet',
  },
  {
    icon: sharedImages.icons.receipt,
    label: 'Transaction History',
    url: 'TransactionHistory',
  },
  {
    icon: sharedImages.icons.eyeOpen,
    label: 'Recently Viewed',
    url: 'RecentlyViewed',
  },
  {
    icon: sharedImages.icons.search_black,
    label: 'Recently Searched',
    url: 'RecentlySearched',
  },
];

const aboutOption = [
  {
    icon: sharedImages.icons.messageQuestion,
    label: 'FAQs',
    url: 'FAQs',
  },
  {
    icon: sharedImages.icons.terms,
    label: 'Terms and Conditions',
    url: 'Terms',
  },
  {
    icon: sharedImages.icons.message,
    label: 'Contact us',
    url: 'ContactUs',
  },
];
