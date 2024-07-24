import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Comentarios = ({ route }) => {
  const [comentarios, setComentarios] = useState([]);
  const navigation = useNavigation();
  const { postId, username } = route.params;

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const storedComments = await AsyncStorage.getItem('comentarios');
        const localComentarios = storedComments ? JSON.parse(storedComments) : [];
        const postComentarios = localComentarios.filter(comentario => comentario.postId === postId);
        setComentarios([...response.data, ...postComentarios]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComentarios();
  }, [postId]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.email}>{item.name}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comentarios</Text>
      <FlatList
        data={comentarios}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AgregarComentario', { postId, username })}
      >
        <Text style={styles.buttonText}>Agregar Comentario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    flexGrow: 1,
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
  email: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Comentarios;
