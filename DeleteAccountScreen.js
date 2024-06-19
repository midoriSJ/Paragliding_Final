import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeleteAccountScreen({ navigation }) {
  const [password, setPassword] = useState('');

  const handleDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete('http://121.127.165.28:5000/api/delete-user', {
        headers: { Authorization: `Bearer ${token}` },
        data: { password },
      });

      if (response.data.success) {
        Alert.alert(
          '성공',
          '회원 탈퇴가 성공적으로 처리되었습니다.',
          [
            {
              text: '확인',
              onPress: async () => {
                await AsyncStorage.removeItem('token');
                navigation.navigate('FirstScreen');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('실패', response.data.message || '회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요."
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});