import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Publicaciones = ({ route }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const navigation = useNavigation();
  const { username } = route.params || {};

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPublicaciones(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPublicaciones();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Comentarios', { postId: item.id })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {username && <Text style={styles.welcome}>Hola {username}!!!</Text>}
      <FlatList
        data={publicaciones}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Publicaciones;
