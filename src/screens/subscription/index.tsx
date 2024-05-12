import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '@components/header';
import {ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import {AppButton} from '@components/button';

const SubscriptionScreen = () => {
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="Choose Subscription" />
        <Paragraph
          color="#606060"
          style={{
            textAlign: 'center',
            fontSize: 12,
            marginTop: 12,
          }}>
          Get the best service with our subscription plans tailored to make you
          have the best experience.
        </Paragraph>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            borderWidth: 1,
            marginVertical: 20,
            borderColor: '#6AB9F7',
            padding: 12,
          }}>
          <Paragraph fontSize={13} color="#606060" fontWeight="600">
            Subscription Perks
          </Paragraph>
          <View style={{marginVertical: 12}}>
            <Paragraph color="#606060" fontSize={15} fontWeight="600">
              Seamless Support
            </Paragraph>
            <Paragraph color="#606060">
              One of the perks of being a subscriber is access to seamless
              support from our team
            </Paragraph>
          </View>
          <View style={{marginVertical: 12}}>
            <Paragraph color="#606060" fontSize={15} fontWeight="600">
              Cancel Anytime
            </Paragraph>
            <Paragraph color="#606060">
              Manage your account easily in the app
            </Paragraph>
          </View>
          <View style={{marginVertical: 12}}>
            <Paragraph color="#606060" fontSize={15} fontWeight="600">
              Exclusive Promos
            </Paragraph>
            <Paragraph color="#606060">
              Save on your next purchase and get better deals
            </Paragraph>
          </View>
          <View style={{marginVertical: 12}}>
            <Paragraph color="#606060" fontSize={15} fontWeight="600">
              Post Unlimited Items
            </Paragraph>
            <Paragraph color="#606060">
              You can post as much items for sale
            </Paragraph>
          </View>
        </View>
        <AppButton
          text="Choose A Subscription Plan"
          style={{
            marginTop: 'auto',
          }}
        />
      </ViewContainer>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});
