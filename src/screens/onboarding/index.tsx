/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useRef, useState} from 'react';

import {View, FlatList, ViewToken, StyleSheet, Pressable} from 'react-native';
import {
  BaseView,
  FlexedView,
  Spacer,
  ViewContainer,
} from '../../components/view';
import {Animated} from 'react-native';
import {Slides} from './data';
import Slider from './Slide';
import Dots from './Dots';
import {setDidOnboard} from '@store/auth';
import {useDispatch} from 'react-redux';
import {Paragraph} from '@components/text/text';

const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const [ind, setInd] = useState(0);

  const scrollTo = () => {
    if (ind >= 2) {
      skip();
      return;
    }
    slideRef.current.scrollToIndex({index: ind + 1});
    setInd(prev => prev + 1);
  };

  const skip = () => {
    dispatch(setDidOnboard(true));
  };

  const onViewableItemsChanged = React.useRef(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      const newIndex = info.viewableItems[0].index;
      setCurrentIndex(newIndex as number);
      setInd(newIndex as number);
    },
  ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  return (
    <BaseView>
      <Spacer />
      <ViewContainer>
        <FlexedView justifyContent="space-between">
          <Paragraph fontSize={17}>{`${ind + 1}/${Slides.length}`}</Paragraph>
          <Pressable onPress={skip}>
            <Paragraph fontSize={17}>Skip</Paragraph>
          </Pressable>
        </FlexedView>
      </ViewContainer>
      <Spacer height={30} />
      <View>
        <FlatList
          // style={{zIndex: -10}}
          pagingEnabled
          scrollEventThrottle={32}
          horizontal
          bounces={false}
          data={Slides}
          keyExtractor={ob => ob.id}
          renderItem={({item, index}) => <Slider index={index} data={item} />}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <Spacer height={40} />
      <ViewContainer>
        <FlexedView justifyContent="space-between">
          <Dots slides={Slides} index={currentIndex} scrollX={scrollX} />

          <Pressable onPress={scrollTo}>
            <Paragraph>{ind < 2 ? 'NEXT' : 'GET STARTED'}</Paragraph>
          </Pressable>
        </FlexedView>
      </ViewContainer>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  absolute: {
    alignItems: 'center',
  },
});

export default Onboarding;
