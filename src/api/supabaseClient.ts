import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jvrdwgdsobyoenmscayo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2cmR3Z2Rzb2J5b2VubXNjYXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3Mzk1MDAsImV4cCI6MjA0NjMxNTUwMH0.RItob85H74lSgHvIOYj90KZTwylNrYyuZc_PORcRu_I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
