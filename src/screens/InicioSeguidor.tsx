import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../api/supabaseClient';

const InicioSeguidor: React.FC = () => {
  const [partidos, setPartidos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    obtenerPartidos();
    obtenerEstadisticas();
  }, []);

  const obtenerPartidos = async () => {
    const { data, error } = await supabase.from('partidos').select('*');
    if (error) console.error('Error al obtener partidos:', error);
    else setPartidos(data);
  };

  const obtenerEstadisticas = async () => {
    const { data, error } = await supabase.from('estadisticas').select('*');
    if (error) console.error('Error al obtener estadísticas:', error);
    else setEstadisticas(data);
  };

  const renderPartido = ({ item }) => (
    <View style={estilos.partido}>
      <Text>{item.equipos} - {item.fecha}</Text>
      <Text>Resultado: {item.resultado}</Text>
    </View>
  );

  const renderEstadistica = ({ item }) => (
    <View style={estilos.estadistica}>
      <Text>Equipo: {item.equipo}</Text>
      <Text>Goles: {item.goles} - Tarjetas: {item.tarjetas}</Text>
    </View>
  );

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Panel de Seguidor</Text>
      <Text style={estilos.subtitulo}>Próximos Partidos</Text>
      <FlatList data={partidos} keyExtractor={(item) => item.id} renderItem={renderPartido} />
      <Text style={estilos.subtitulo}>Estadísticas</Text>
      <FlatList data={estadisticas} keyExtractor={(item) => item.id} renderItem={renderEstadistica} />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: { padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  partido: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  estadistica: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});

export default InicioSeguidor;