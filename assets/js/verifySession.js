import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)

window.onload = () => {
    const session = JSON.parse(localStorage.getItem('supabaseSession'))

    if (session) {
        supabase.auth.setSession(session)
        console.log('Session restored:', session)
    } else {
        console.log('No active session found')
        window.location.href = "../../paginas/login.html";
    }
}