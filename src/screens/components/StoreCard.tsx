import {
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {FlexedView} from '@components/view';
import {Paragraph} from '@components/text/text';
import sharedImages from '@utility/sharedImages';
import colors from '@utility/colors';
import {widthPixel} from '@utility/pxToDpConvert';
import {Rating} from 'react-native-rating-element';

interface CardProps {
  item: {
    name: string;
    rating: number;
    category?: string;
    logo?: any;
  };
  onPress: () => void;
}

const StoreCard = ({
  item: {category, rating, name, logo},
  onPress,
}: CardProps) => {
  const {width} = useWindowDimensions();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, {width: width * 0.43}]}>
      <Image
        defaultSource={sharedImages.storeBanner}
        source={{uri: logo?.url}}
        style={styles.storeBanner}
      />
      <View style={styles.catV}>
        <Paragraph fontSize={14} textAlign="center">
          {category ?? ''}
        </Paragraph>
      </View>
      <View style={styles.detailV}>
        <FlexedView style={styles.row}>
          <Image style={styles.icons} source={sharedImages.icons.verify} />
          <Paragraph
            style={{flex: 1}}
            color={colors.dark_blue}
            fontWeight="600">
            {name}
          </Paragraph>
        </FlexedView>
        <View style={styles.row}>
          <Paragraph fontSize={12} color="#737373" style={{marginBottom: 3}}>
            Store rating
          </Paragraph>
          <Rating
            rated={rating}
            totalCount={5}
            size={14}
            type="custom"
            selectedIconImage={require('../../assets/icons/starfilled.png')}
            emptyIconImage={require('../../assets/icons/stargray.png')}
            readonly // by default is false
            direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
          />

          {/* <FlexedView style={styles.row}>
          <Image style={styles.icons} source={sharedImages.icons.location} />
          <Paragraph>{location}</Paragraph>
        </FlexedView> */}
        </View>
      </View>
    </Pressable>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
    marginVertical: 8,
  },
  detailV: {
    padding: widthPixel(10),
  },
  container: {
    // flex: 1,
    marginHorizontal: 5,
    // borderWidth: 2,
    borderRadius: 12,
    backgroundColor: 'white',
    borderColor: colors.border,
    marginBottom: 10,
  },
  storeBanner: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  catV: {
    padding: 8,
    backgroundColor: colors.background,
  },
  icons: {width: 20, height: 20, marginRight: 5},
});
