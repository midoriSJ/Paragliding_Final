import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function WritePostScreen() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('자유게시판');
  const [modalVisible, setModalVisible] = useState(false);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredFactories, setFilteredFactories] = useState([]);
  const [selectedFactory, setSelectedFactoryLocal] = useState(null);
  const navigation = useNavigation();

  const requestStoragePermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to allow access to your photos to add images.');
      return false;
    }
    return true;
  };

  const handleAddImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return;

    if (images.length < 5) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImages([...images, { uri: result.uri }]);
      }
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleComplete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('location', location);
      formData.append('content', content);
      formData.append('board', selectedBoard);  // 선택한 게시판 추가
      images.forEach((image, index) => {
        formData.append('image', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      });

      const response = await axios.post('http://121.127.165.28:5000/api/createPosts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        Alert.alert('글이 성공적으로 등록되었습니다.');
        navigation.goBack();
      } else {
        Alert.alert('글 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('글 등록 중 오류가 발생했습니다.');
    }
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.get('http://121.127.165.28:5000/factories');
      const regionsData = response.data.reduce((acc, factory) => {
        const regionKey = factory.region.substring(0, 2);
        if (!acc[regionKey]) {
          acc[regionKey] = { name: getFullRegionName(regionKey), factories: [] };
        }
        acc[regionKey].factories.push(factory.name);
        return acc;
      }, {});
      setRegions(Object.values(regionsData));
    } catch (error) {
      console.error('Error fetching regions:', error);
      Alert.alert('오류', '활공장 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const getFullRegionName = (region) => {
    const regionMap = {
      '경기': '경기도',
      '경남': '경상남도',
      '강원': '강원도',
      '전남': '전라남도',
      '경북': '경상북도',
      '광주': '광주시',
      '대구': '대구시',
      '대전': '대전시',
      '부산': '부산시',
      '서울': '서울시',
      '울산': '울산시',
      '인천': '인천시',
      '제주': '제주도',
      '충남': '충청남도',
      '충북': '충청북도',
      '전북': '전라북도'
    };
    return regionMap[region] || region;
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = regions.flatMap(region =>
        region.factories.filter(factory => factory.includes(text))
      );
      setFilteredFactories(filtered);
    } else {
      setFilteredFactories(selectedRegion ? selectedRegion.factories : []);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setFilteredFactories(region.factories);
    setSearchText('');
  };

  const handleFactorySelect = (factory) => {
    setSelectedFactoryLocal(factory);
  };

  const handleConfirm = () => {
    if (selectedFactory) {
      const region = selectedRegion.name;
      setLocation(selectedFactory);
      setModalVisible(false);
    } else {
      Alert.alert('선택 오류', '활공장을 선택하세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>글쓰기</Text>
        <TouchableOpacity onPress={handleComplete}>
          <Text style={styles.completeButton}>완료</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.locationContainer}>
        <Text>{location || '방문한 장소를 선택하세요'}</Text>
        <TouchableOpacity onPress={() => { setModalVisible(true); fetchRegions(); }}>
          <Text style={styles.selectButton}>선택</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textArea}
        placeholder="내용"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Picker
        selectedValue={selectedBoard}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedBoard(itemValue)}
      >
        <Picker.Item label="자유게시판" value="자유게시판" />
        <Picker.Item label="모임게시판" value="모임게시판" />
      </Picker>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
          <Text style={styles.addButtonText}>📷</Text>
        </TouchableOpacity>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Text style={styles.imageText}>{`사진${index + 1}`}</Text>
            <TouchableOpacity onPress={() => handleRemoveImage(index)}>
              <Text style={styles.removeButton}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>활공장 선택</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="활공장을 검색해 주세요"
            value={searchText}
            onChangeText={handleSearch}
          />
          <View style={styles.selectionContainer}>
            <View style={styles.regionColumn}>
              <ScrollView>
                {regions.map((region) => (
                  <TouchableOpacity key={region.name} onPress={() => handleRegionSelect(region)}>
                    <Text style={[
                      styles.regionText,
                      selectedRegion?.name === region.name && styles.selectedRegionText
                    ]}>{region.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.factoryColumn}>
              <ScrollView>
                {filteredFactories.map((factory, index) => (
                  <TouchableOpacity key={index} onPress={() => handleFactorySelect(factory)}>
                    <Text style={[
                      styles.factoryText,
                      selectedFactory === factory && styles.selectedFactoryText
                    ]}>{factory}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  completeButton: {
    fontSize: 16,
    color: '#007bff',
    backgroundColor: '#e0f7fa',
    padding: 5,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    paddingTop: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  addButtonText: {
    fontSize: 24,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  imageText: {
    width: 60,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    lineHeight: 60,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#ff0000',
    color: '#fff',
    borderRadius: 10,
    padding: 2,
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  selectButton: {
    fontSize: 16,
    color: '#007bff',
    backgroundColor: '#e0f7fa',
    padding: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  regionColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  regionText: {
    fontSize: 16,
    padding: 10,
  },
  selectedRegionText: {
    backgroundColor: '#e0f7fa',
  },
  factoryColumn: {
    flex: 2,
    paddingLeft: 10,
  },
  factoryText: {
    fontSize: 16,
    padding: 10,
  },
  selectedFactoryText: {
    backgroundColor: '#c8e6c9',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});