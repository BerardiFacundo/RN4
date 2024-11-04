import { supabase } from './supabaseClient';

export const getTeams = async () => {
  const { data, error } = await supabase.from('teams').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const addTeam = async (team: { name: string; logo: string }) => {
  const { data, error } = await supabase.from('teams').insert([team]);
  if (error) throw new Error(error.message);
  return data;
};