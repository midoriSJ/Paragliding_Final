import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function FirstBowFactoryInfoScreen({ route }) {
  const { selectedFactory } = route.params;
  const [factoryDetails, setFactoryDetails] = useState({});

  useEffect(() => {
    const fetchFactoryDetails = async () => {
      try {
        const response = await axios.get(`http://121.127.165.28:5000/factory-details?name=${selectedFactory}`);
        setFactoryDetails(response.data);
      } catch (error) {
        console.error('Error fetching factory details:', error);
        Alert.alert('오류', '활공장 정보를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchFactoryDetails();
  }, [selectedFactory]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedFactory}</Text>
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>{factoryDetails.temperature || '-'}</Text>
        <Text style={styles.weatherInfo}>날씨특보 - </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>풍향</Text>
          <Text style={styles.infoContent}>{factoryDetails.windDirection || '-'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>풍속</Text>
          <Text style={styles.infoContent}>{factoryDetails.windSpeed || '-'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>구름양</Text>
          <Text style={styles.infoContent}>{factoryDetails.cloudCoverage || '-'}</Text>
        </View>
      </View>
      <Text style={styles.subTitle}>가는길</Text>
      <Text style={styles.detailsText}>{factoryDetails.directions || '-'}</Text>
      <Text style={styles.subTitle}>주차장소</Text>
      <Text style={styles.detailsText}>{factoryDetails.parking || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginRight: 10,
  },
  weatherInfo: {
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoContent: {
    fontSize: 16,
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
  },
});