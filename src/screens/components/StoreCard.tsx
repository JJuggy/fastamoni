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
    category: string;
    verified: boolean;
    location: string;
  };
  onPress: () => void;
}

const StoreCard = ({
  item: {category, verified, rating, location, name},
  onPress,
}: CardProps) => {
  const {width} = useWindowDimensions();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, {width: width * 0.43}]}>
      <Image source={sharedImages.storeImg} style={styles.storeBanner} />
      <View style={styles.catV}>
        <Paragraph fontSize={14} textAlign="center">
          {category}
        </Paragraph>
      </View>
      <View style={styles.detailV}>
        <FlexedView style={styles.row}>
          {verified && (
            <Image style={styles.icons} source={sharedImages.icons.verify} />
          )}
          <Paragraph color={colors.dark_blue} fontWeight="600">
            {name}
          </Paragraph>
        </FlexedView>
        <FlexedView style={styles.row}>
          <Paragraph>{`${rating}`}</Paragraph>
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
        </FlexedView>
        <FlexedView style={styles.row}>
          <Image style={styles.icons} source={sharedImages.icons.location} />
          <Paragraph>{location}</Paragraph>
        </FlexedView>
      </View>
    </Pressable>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  detailV: {
    padding: widthPixel(10),
  },
  container: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.border,
  },
  storeBanner: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  catV: {
    padding: 8,
    backgroundColor: colors.border,
  },
  icons: {width: 20, height: 20, marginRight: 5},
});
