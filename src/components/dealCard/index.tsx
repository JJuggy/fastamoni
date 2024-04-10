import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlexedView} from '@components/view';
import colors from '@utility/colors';
import LinearGradient from 'react-native-linear-gradient';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';

interface Props {
  storeName: string;
  dealDescription: string;
  verified: boolean;
}
const DealCard = ({storeName, dealDescription, verified}: Props) => {
  return (
    <LinearGradient
      colors={['#FF9A6C', '#D7A22B']}
      style={{
        backgroundColor: colors.primary,
        height: 180,
        borderRadius: 15,
        marginVertical: 12,
        width: 400,
        marginRight: 12,
      }}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          height: '100%',
        }}>
        <View
          style={{
            width: '50%',
          }}>
          <FlexedView>
            <Image
              style={styles.icons}
              source={sharedImages.icons.shop}
              tintColor={colors.white}
            />
            <Paragraph
              fontWeight="400"
              fontSize={15}
              style={{
                color: colors.white,
              }}>
              Top Seller
            </Paragraph>
          </FlexedView>
          <View
            style={{
              flexDirection: 'column',
              marginVertical: 12,
            }}>
            <Paragraph fontSize={20} fontWeight="700" color={colors.white}>
              {storeName}
            </Paragraph>
            <Paragraph
              style={{
                marginVertical: 5,
              }}
              color={colors.white}>
              {dealDescription}
            </Paragraph>
          </View>
          <FlexedView>
            <Image style={styles.icons} source={sharedImages.icons.verify} />
            <Paragraph
              fontSize={12}
              style={{
                color: colors.white,
              }}>
              Verified
            </Paragraph>
          </FlexedView>
        </View>
        <View style={{width: '50%', position: 'absolute', top: 10, right: 35}}>
          <Image
            source={sharedImages.topDealImg}
            style={{
              width: 170,
              height: 170,
              borderRadius: 15,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default DealCard;

const styles = StyleSheet.create({
  icons: {width: 20, height: 20, marginRight: 5},
});
