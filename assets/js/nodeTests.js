// app.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://zrwtmvescjmkdenhdaqh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs";

const supabase = createClient(supabaseUrl, supabaseKey);

// Ahora puedes usar supabase para interactuar con tu base de datos


async function insertTest(){
    
    const { error } = await supabase
    .from('countries')
    .insert({ id: 1, name: 'Denmark' })
}