// src/navigation/RutaPorRol.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { obtenerRolUsuario } from '../hooks/useRolUsuario';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioAdmin from '../screens/InicioAdmin';
import InicioJugador from '../screens/InicioJugador';
import InicioSeguidor from '../screens/InicioSeguidor';

const Stack = createNativeStackNavigator();

const RutaPorRol: React.FC = () => {
  const rol = obtenerRolUsuario();

  return (
    <Stack.Navigator>
      {rol === 'admin' && <Stack.Screen name="InicioAdmin" component={InicioAdmin} />}
      {rol === 'jugador' && <Stack.Screen name="InicioJugador" component={InicioJugador} />}
      {rol === 'seguidor' && <Stack.Screen name="InicioSeguidor" component={InicioSeguidor} />}
      {!rol && (
        <View>
          <Text>Cargando...</Text>
        </View>
      )}
    </Stack.Navigator>
  );
};

export default RutaPorRol;
