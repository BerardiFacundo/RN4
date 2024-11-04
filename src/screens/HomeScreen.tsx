import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getTeams } from '../api/teamService';

const HomeScreen: React.FC = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    (async () => {
      const teamsData = await getTeams();
      setTeams(teamsData || []);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipos</Text>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default HomeScreen;
