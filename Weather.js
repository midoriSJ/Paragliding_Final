import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchWeatherData = async () => {
    try {
      const apiKey = '111002b452c141798051161faec61742';
      const city = 'Cheonan'; // 원하는 도시로 변경하세요.
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      await postDataToServer(response.data); // 수정: 날씨 데이터 전송
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchWeatherData();
      setLoading(false);
    };

    fetchData();
  }, []);

  const postDataToServer = async (data) => {
    try {
      await axios.post("http://121.127.165.28:5000/api/data", { data });
      console.log('Data posted successfully');
    } catch (error) {
      console.error('Error posting data to server:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Error fetching weather data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather</Text>
      <Text style={styles.weather}>City : {weatherData.name}</Text>
      <Text style={styles.weather}>Temperature : {weatherData.main.temp}°C</Text>
      <Text style={styles.weather}>Wind : {weatherData.wind.speed} m/sec</Text>
      <Text style={styles.weather}>Description : {weatherData.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  weather: {
    fontSize: 18,
    marginBottom: 10,
  },
  list : {
    fontSize : 18,
    marginBottom : 10,
  },
});