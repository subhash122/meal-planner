
import { createClient } from '@supabase/supabase-js'
const supUrl = process.env.REACT_APP_SUPABASE_URL ;
const supKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supUrl, supKey);
export{supabase}