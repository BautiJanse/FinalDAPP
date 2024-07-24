import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ConfigScreen = () => {
  const [selectedColor, setSelectedColor] = useState('black');
  const navigation = useNavigation();

  useEffect(() => {
    const loadColor = async () => {
      try {
        const storedColors = await AsyncStorage.getItem('colors');
        if (storedColors) {
          const colors = JSON.parse(storedColors);
          setSelectedColor(colors.backgroundColor);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadColor();
  }, []);

  const handleApply = async () => {
    try {
      const colors = {
        backgroundColor: selectedColor,
        borderColor: selectedColor,
      };
      await AsyncStorage.setItem('colors', JSON.stringify(colors));
      Alert.alert('Configuración', 'Los cambios han sido aplicados');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la configuración');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuración</Text>
      <TouchableOpacity
        style={[styles.colorOption, { backgroundColor: 'red' }]}
        onPress={() => setSelectedColor('red')}
      />
      <TouchableOpacity
        style={[styles.colorOption, { backgroundColor: 'blue' }]}
        onPress={() => setSelectedColor('blue')}
      />
      <TouchableOpacity
        style={[styles.colorOption, { backgroundColor: 'green' }]}
        onPress={() => setSelectedColor('green')}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: selectedColor }]}
        onPress={handleApply}
      >
        <Text style={styles.buttonText}>Aplicar</Text>
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
  colorOption: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
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

export default ConfigScreen;
