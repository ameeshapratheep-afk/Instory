import { createClient } from '@supabase/supabase.js'

const supabaseUrl = 'https://YOUR-PROJECT-REF.supabase.co'
const supabaseKey = 'sb_publishable_AIvSB8e34VXP1-ldf3cs_Q_sfqA1yO4' 

export const supabase = createClient(supabaseUrl, supabaseKey)