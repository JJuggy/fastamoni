/* eslint-disable react-hooks/rules-of-hooks */
import React, {useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface CodeInputFieldProps {
  setInputCode: React.Dispatch<React.SetStateAction<string[]>>;
}

const CodeInputField: React.FC<CodeInputFieldProps> = ({setInputCode}) => {
  const inputRefs = Array.from({length: 4}, () => useRef<TextInput>(null));

  const focusNextInput = (index: number) => {
    if (inputRefs[index + 1]) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const focusPreviousInput = (index: number) => {
    if (inputRefs[index - 1]) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleTextChange = (text: string, index: number) => {
    setInputCode(prevInputCode => {
      const newInputCode = [...prevInputCode];
      newInputCode[index] = text;
      return newInputCode;
    });

    if (text.length === 1) {
      focusNextInput(index);
    } else if (text.length === 0) {
      focusPreviousInput(index);
    }
  };

  return (
    <View style={styles.container}>
      {inputRefs.map((inputRef, index) => (
        <TextInput
          key={index}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => handleTextChange(text, index)}
          ref={inputRef}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#4DABF5',
    textAlign: 'center',
    borderRadius: 10,
    color: '#4DABF5',
  },
});

export default CodeInputField;
