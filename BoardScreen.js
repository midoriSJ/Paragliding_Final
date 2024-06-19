import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BoardScreen() {
  const [selectedTab, setSelectedTab] = useState('자유게시판');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://121.127.165.28:5000/api/getPosts`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { board: selectedTab } // 서버로 선택된 게시판 정보를 전달
        });
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        Alert.alert('오류', '게시글을 가져오는 중 문제가 발생했습니다.');
      }
    };

    fetchPosts();
  }, [selectedTab]);

  const navigateToPostDetail = (post) => {
    navigation.navigate('PostDetail', { post, boardTitle: selectedTab });
  };

  const navigateToWritePost = () => {
    navigation.navigate('WritePost');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>게시판</Text>
        <TouchableOpacity onPress={navigateToWritePost}>
          <Ionicons name="add-circle-outline" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('자유게시판')}>
          <Text style={[styles.tab, selectedTab === '자유게시판' && styles.activeTab]}>자유게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('모임게시판')}>
          <Text style={[styles.tab, selectedTab === '모임게시판' && styles.activeTab]}>모임게시판</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {filteredPosts.length === 0 ? (
          <Text style={styles.noPostsText}>게시글이 없습니다.</Text>
        ) : (
          filteredPosts.map((post, index) => (
            <TouchableOpacity key={index} style={styles.postContainer} onPress={() => navigateToPostDetail(post)}>
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postText}>{post.content}</Text>
                <Text style={styles.postAuthor}>{post.username}</Text>
                <Text style={styles.postDate}>{new Date(post.created_at).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    fontSize: 18,
    marginRight: 20,
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  scrollContainer: {
    flex: 1,
  },
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postText: {
    fontSize: 16,
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: '#777',
  },
  postDate: {
    fontSize: 14,
    color: '#777',
  },
  noPostsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
