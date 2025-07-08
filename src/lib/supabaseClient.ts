import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hfspqgtqlhlncxafqxkz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmc3BxZ3RxbGhsbmN4YWZxeGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODU0NjEsImV4cCI6MjA2MzY2MTQ2MX0.MU7tMAAVguYfYm84pM2DVFTxPpwQ4MVjsnEiI4WgYcw'
export const supabase = createClient(supabaseUrl, supabaseKey)
