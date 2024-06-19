import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const LaunchSiteScreen = ({ navigation }) => {
  const [launchSites, setLaunchSites] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://121.127.165.28:5000/api/launchsites')
      .then(response => {
        setLaunchSites(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Launch Sites"
        value={search}
        onChangeText={setSearch}
      />
      <ScrollView style={styles.scrollView}>
        {launchSites
          .filter(site => site.name.toLowerCase().includes(search.toLowerCase()))
          .map((site, index) => (
            <TouchableOpacity key={index} style={styles.launchSite} onPress={() => navigation.navigate('Home', { selectedSite: site })}>
              <Text>{site.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  launchSite: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LaunchSiteScreen;