import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyPageScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post('http://121.127.165.28:5000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.message === "Logout successful") {
        await AsyncStorage.removeItem('token'); // 토큰 제거
        navigation.navigate('FirstScreen');
      } else {
        Alert.alert('로그아웃 실패', response.data.message || '로그아웃에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('로그아웃 실패', '서버와 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangeUserInfo')}>
        <Text style={styles.buttonText}>개인정보 수정</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DeleteAccount')}>
        <Text style={styles.buttonText}>회원탈퇴</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});