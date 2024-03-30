import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import colors from '@utility/colors';
import {ButtonGroup} from '@rneui/themed';

const Faq = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <BaseView background={colors.background}>
      <ViewContainer>
        <Header title="FAQs" />
        <Spacer />
        <FlexedView justifyContent="center">
          <ButtonGroup
            buttons={['Buyer', 'Seller']}
            selectedIndex={selectedIndex}
            onPress={value => {
              setSelectedIndex(value);
            }}
            containerStyle={styles.btnGroup}
            selectedButtonStyle={styles.selectedBtn}
            textStyle={{color: colors.black}}
          />
        </FlexedView>
      </ViewContainer>
    </BaseView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  btnGroup: {
    width: '78%',
    backgroundColor: colors.border,
    borderRadius: 25,
    padding: 5,
    height: 50,
  },
  selectedBtn: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
});
