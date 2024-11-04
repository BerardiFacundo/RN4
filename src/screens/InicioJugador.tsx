import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import { supabase } from '../api/supabaseClient';

const InicioJugador: React.FC = () => {
  const [partidos, setPartidos] = useState([]);
  const [nuevoEquipoId, setNuevoEquipoId] = useState('');

  useEffect(() => {
    obtenerPartidos();
  }, []);

  const obtenerPartidos = async () => {
    const { data, error } = await supabase.from('partidos').select('*');
    if (error) console.error('Error al obtener partidos:', error);
    else setPartidos(data);
  };

  const inscribirsePartido = async (partidoId: string) => {
    const usuarioId = supabase.auth.user()?.id;
    const { error } = await supabase
      .from('inscripciones')
      .insert([{ usuario_id: usuarioId, partido_id: partidoId }]);
    if (error) console.error('Error al inscribirse:', error);
    else alert('Inscripción exitosa');
  };

  const cambiarEquipo = async () => {
    const usuarioId = supabase.auth.user()?.id;
    const { error } = await supabase
      .from('jugadores')
      .update({ equipo_id: nuevoEquipoId })
      .eq('usuario_id', usuarioId);
    if (error) console.error('Error al cambiar de equipo:', error);
    else alert('Equipo actualizado correctamente');
  };

  const renderPartido = ({ item }) => (
    <View style={estilos.partido}>
      <Text>{item.equipos}</Text>
      <Text>{item.fecha}</Text>
      <Button title="Inscribirse" onPress={() => inscribirsePartido(item.id)} />
    </View>
  );

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Panel de Jugador</Text>
      <FlatList data={partidos} keyExtractor={(item) => item.id} renderItem={renderPartido} />
      <TextInput placeholder="ID del Nuevo Equipo" value={nuevoEquipoId} onChangeText={setNuevoEquipoId} style={estilos.input} />
      <Button title="Cambiar de Equipo" onPress={cambiarEquipo} />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: { padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
  partido: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between' },
});

export default InicioJugador;