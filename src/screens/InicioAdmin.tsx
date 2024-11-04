import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import { supabase } from '../api/supabaseClient';

const InicioAdmin: React.FC = () => {
  const [jugadores, setJugadores] = useState([]);
  const [nombreJugador, setNombreJugador] = useState('');
  const [equipoId, setEquipoId] = useState('');
  const [actualizando, setActualizando] = useState(false);

  useEffect(() => {
    obtenerJugadores();
  }, []);

  const obtenerJugadores = async () => {
    const { data, error } = await supabase.from('jugadores').select('*');
    if (error) console.error('Error al obtener jugadores:', error);
    else setJugadores(data);
  };

  const agregarJugador = async () => {
    if (!nombreJugador || !equipoId) return alert('Completa todos los campos');
    const { error } = await supabase
      .from('jugadores')
      .insert([{ nombre: nombreJugador, equipo_id: equipoId }]);
    if (error) console.error('Error al agregar jugador:', error);
    else {
      alert('Jugador agregado correctamente');
      setNombreJugador('');
      setEquipoId('');
      obtenerJugadores();
    }
  };

  const borrarJugador = async (id: string) => {
    const { error } = await supabase.from('jugadores').delete().eq('id', id);
    if (error) console.error('Error al borrar jugador:', error);
    else obtenerJugadores();
  };

  const renderJugador = ({ item }) => (
    <View style={estilos.jugador}>
      <Text>{item.nombre}</Text>
      <Button title="Borrar" onPress={() => borrarJugador(item.id)} />
    </View>
  );

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Panel de Administrador</Text>
      <TextInput placeholder="Nombre del Jugador" value={nombreJugador} onChangeText={setNombreJugador} style={estilos.input} />
      <TextInput placeholder="ID del Equipo" value={equipoId} onChangeText={setEquipoId} style={estilos.input} />
      <Button title="Agregar Jugador" onPress={agregarJugador} />
      <FlatList data={jugadores} keyExtractor={(item) => item.id} renderItem={renderJugador} />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: { padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
  jugador: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between' },
});

export default InicioAdmin;