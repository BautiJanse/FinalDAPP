import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Config from './screens/Config';
import Publicaciones from './screens/Publicaciones';
import Comentarios from './screens/Comentarios';
import AgregarComentario from './screens/AgregarComentario';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Config" component={Config} options={{ title: 'Configuración' }} />
        <Stack.Screen name="Publicaciones" component={Publicaciones} options={{ title: 'Publicaciones' }} />
        <Stack.Screen name="Comentarios" component={Comentarios} options={{ title: 'Comentarios' }} />
        <Stack.Screen name="AgregarComentario" component={AgregarComentario} options={{ title: 'Comentar' }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
