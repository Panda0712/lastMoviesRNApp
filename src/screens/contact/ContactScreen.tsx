import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Container, TextComponent } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { Button } from '@bsdaoquang/rncomponent';

const ContactScreen = ({ navigation }: any) => {
  const [feedback, setFeedback] = useState('');

  const handleSend = () => {
    console.log(feedback);
    setFeedback('');
  };

  return (
    <Container
      fixed
      title='Giới thiệu dịch vụ'
      back={
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Ionicons name='chevron-back' size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{ backgroundColor: colors.black, padding: 16, flex: 1 }}
    >
      <TextComponent text='Góp ý dịch vụ' />
      <TextInput
        style={styles.input}
        placeholder='Nhập ý kiến của bạn ....'
        placeholderTextColor={colors.grey}
        multiline
        numberOfLines={100}
        value={feedback}
        onChangeText={setFeedback}
      />
      <Button title='Gửi góp ý' onPress={handleSend} />
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 100,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: colors.white,
    marginBottom: 16,
    width: '100%',
  },
});

export default ContactScreen;
