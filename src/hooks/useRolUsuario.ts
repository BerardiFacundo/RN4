import { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

export const obtenerRolUsuario = () => {
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    const fetchRolUsuario = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error al obtener el rol del usuario:', error);
      } else {
        const rolUsuario = data?.user_metadata?.rol;
        setRol(rolUsuario || 'seguidor');
      }
    };
    fetchRolUsuario();
  }, []);

  return rol;
};