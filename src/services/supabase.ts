import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vxuhfnfkmvsyjgrsdnqi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4dWhmbmZrbXZzeWpncnNkbnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMjcwOTMsImV4cCI6MjAyMjcwMzA5M30.3oTHuODV8HmlE1qPlow3xW77UrSarrJn117pXQRSrm8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
