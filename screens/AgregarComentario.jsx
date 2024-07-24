import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AgregarComentario = ({ route }) => {
  const [comentario, setComentario] = useState('');
  const navigation = useNavigation();
  const { postId, username } = route.params;

  const handleAgregarComentario = async () => {
    if (!comentario.trim()) {
      Alert.alert('Error', 'El comentario no puede estar vacío');
      return;
    }

    const nuevoComentario = {
      postId,
      id: Date.now(),
      name: `${username}`,
      body: comentario,
    };

    try {
      const storedComments = await AsyncStorage.getItem('comentarios');
      const comentarios = storedComments ? JSON.parse(storedComments) : [];
      comentarios.push(nuevoComentario);
      await AsyncStorage.setItem('comentarios', JSON.stringify(comentarios));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agregar Comentario</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario"
        value={comentario}
        onChangeText={setComentario}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAgregarComentario}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
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

export default AgregarComentario;
