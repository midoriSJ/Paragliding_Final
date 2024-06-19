import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ route }) {
  const [freeBoardPosts, setFreeBoardPosts] = useState([]);
  const [meetingBoardPosts, setMeetingBoardPosts] = useState([]);
  const [weather, setWeather] = useState({});
  const selectedFactory = route.params?.selectedFactory;
  const region = route.params?.region;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const freeBoardResponse = await axios.get('http://121.127.165.28:5000/api/getPosts', {
          headers: { Authorization: `Bearer ${token}` },
          params: { board: '자유게시판' }
        });
        const meetingBoardResponse = await axios.get('http://121.127.165.28:5000/api/getPosts', {
          headers: { Authorization: `Bearer ${token}` },
          params: { board: '모임게시판' }
        });
        setFreeBoardPosts(freeBoardResponse.data.slice(0, 5));
        setMeetingBoardPosts(meetingBoardResponse.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching posts:', error);
        Alert.alert('오류', '게시물을 가져오는 중 오류가 발생했습니다.');
      }
    };

    const fetchWeather = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post('http://121.127.165.28:5000/api/weather', {
          factoryName: selectedFactory,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        Alert.alert('오류', '날씨 정보를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchPosts();
    if (selectedFactory) {
      fetchWeather();
    }
  }, [selectedFactory]);

  const getDirection = (angle) => {
    if (angle >= 0 && angle <= 22.5) return 'N';
    if (angle > 22.5 && angle <= 67.5) return 'NE';
    if (angle > 67.5 && angle <= 112.5) return 'E';
    if (angle > 112.5 && angle <= 157.5) return 'SE';
    if (angle > 157.5 && angle <= 202.5) return 'S';
    if (angle > 202.5 && angle <= 247.5) return 'SW';
    if (angle > 247.5 && angle <= 292.5) return 'W';
    if (angle > 292.5 && angle <= 337.5) return 'NW';
    if (angle > 337.5 && angle < 360) return 'N';
    return 'N/A';
  };

  const navigateToPostDetail = (post) => {
    navigation.navigate('PostDetail', { post, boardTitle: post.board });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/parachute.png')} style={styles.logo} />
        <Text style={styles.siteName}>GlideMate</Text>
      </View>
      <View style={styles.weatherSection}>
        <Text style={styles.sectionTitle}>활공장: {selectedFactory}</Text>
        <View style={styles.weatherCard}>
          <Text style={styles.weatherLocation}>{region || '활공장 정보 없음'}</Text>
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>{weather.temperature ? `${weather.temperature}°C` : '-'}</Text>
            <Text style={styles.weatherDetails}>{weather.weather || '날씨 정보 없음'}</Text>
          </View>
          <View style={styles.weatherStats}>
            <View style={styles.weatherStat}>
              <Text style={styles.weatherStatLabel}>풍향</Text>
              <Text style={styles.weatherStatValue}>
                {weather.wind_direction !== undefined ? getDirection(weather.wind_direction) : '-'}
              </Text>
            </View>
            <View style={styles.weatherStat}>
              <Text style={styles.weatherStatLabel}>풍속</Text>
              <Text style={styles.weatherStatValue}>{weather.wind_speed ? `${weather.wind_speed} m/s` : '-'}</Text>
            </View>
            <View style={styles.weatherStat}>
              <Text style={styles.weatherStatLabel}>구름양</Text>
              <Text style={styles.weatherStatValue}>{weather.cloud_coverage || '-'}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.boardSection}>
        <Text style={styles.sectionTitle}>자유게시판</Text>
        {freeBoardPosts.length > 0 ? (
          freeBoardPosts.map((post, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToPostDetail(post)}>
              <View style={styles.postCard}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postLocation}>장소: {post.location}</Text>
                <Text style={styles.postContent}>{post.content}</Text>
                <Text style={styles.postDate}>{new Date(post.created_at).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>게시물이 없습니다.</Text>
        )}
      </View>
      <View style={styles.boardSection}>
        <Text style={styles.sectionTitle}>모임게시판</Text>
        {meetingBoardPosts.length > 0 ? (
          meetingBoardPosts.map((post, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToPostDetail(post)}>
              <View style={styles.postCard}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postLocation}>장소: {post.location}</Text>
                <Text style={styles.postContent}>{post.content}</Text>
                <Text style={styles.postDate}>{new Date(post.created_at).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>게시물이 없습니다.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  siteName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
  },
  weatherLocation: {
    fontSize: 18,
    marginBottom: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 10,
  },
  weatherDetails: {
    fontSize: 18,
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherStat: {
    alignItems: 'center',
  },
  weatherStatLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherStatValue: {
    fontSize: 16,
  },
  boardSection: {
    padding: 20,
  },
  postCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postLocation: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
  },
  postDate: {
    fontSize: 14,
    color: '#777',
  },
});