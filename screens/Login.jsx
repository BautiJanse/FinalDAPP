import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();


  // funcion de login anda perfecto
  //cambiar el endpoint en caso de que se necesite otro 
  const handleLogin = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data;

      /*aca chequea que haya un username y email iguales a los ingresados, y en caso de que sea TRUE, ingresa */
      const user = users.find(user => user.username === username && user.email === password);

      if (user) {
        navigation.navigate('Publicaciones', { username: user.username });   /*se agrega el {username ya que tenemos que mandar que usuario se logueo. Sino, no es necesario, sacarlo}*/
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
          <Text style={styles.rememberMeText}>Recordarme</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Config')}>
        <Text style={styles.configLink}>Configuración</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: 'grey',
  },
  rememberMeText: {
    fontSize: 16,
    color: '#333',
  },
  configLink: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
