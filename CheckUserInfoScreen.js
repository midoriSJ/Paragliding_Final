import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function CheckUserInfo({ route }) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://121.127.165.28:5000/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('오류', '사용자 정보를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>개인정보 확인</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>아이디:</Text>
        <Text style={styles.info}>{user.id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>이름:</Text>
        <Text style={styles.info}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>생년월일:</Text>
        <Text style={styles.info}>{user.birthdate}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>휴대전화번호:</Text>
        <Text style={styles.info}>{user.phone}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>이메일:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    fontSize: 16,
  },
});