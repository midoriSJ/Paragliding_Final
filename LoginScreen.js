import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://121.127.165.28:5000/api/login', {
        username: id,
        password: pw,
      });
  
      if (response.status === 200 && response.data.message === "Login successful") {
        if (response.data.token) {
          await AsyncStorage.setItem('token', response.data.token); // 토큰 저장
          setIsLoggedIn(true);
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeTabs' }],
          });
        } else {
          Alert.alert('로그인 실패', '토큰이 없습니다.');
        }
      } else {
        Alert.alert('로그인 실패', response.data.message || '알 수 없는 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('로그인 실패', '서버와 통신 중 문제가 발생했습니다.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/parachute.png')} style={styles.logo} />
        <Text style={styles.title}>GlideMate</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={pw}
          onChangeText={setPw}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 200,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});