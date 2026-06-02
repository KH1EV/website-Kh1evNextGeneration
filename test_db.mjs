import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bqggebmfjvhvafxmuvbf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZ2dlYm1manZodmFmeG11dmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNzAzNTEsImV4cCI6MjA5NTk0NjM1MX0.7RKMwUlydtj8MwXoi1YEfl204J51IvwddEMd-uCGZV4';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
  if (error) {
    console.error('Error:', error);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

main();
