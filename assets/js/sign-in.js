import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient("https://zrwtmvescjmkdenhdaqh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs")

document.getElementById('sign-in-form').addEventListener('submit',function(event){
    event.preventDefault(); // Prevenir el comportamiento por defecto de enviar un formulario

    // Obtener los valores del formulario
    const email = document.getElementById('sign-in-mail').value;
    const password = document.getElementById('sign-in-password').value;

    // Aquí puedes agregar tu lógica para iniciar sesión, por ejemplo, usando Supabase, Firebase, etc.
    console.log('Iniciando sesión con:', email, password);

    supabase.auth.signInWithPassword({
        email: email,
        password: password,
    }).then(response => {
        if (response.error) {
            console.error('Error en inicio de sesión:', response.error.message);
        } else {
            console.log('Sesión iniciada:', response.user);
            // Redireccionar al usuario o hacer algo tras el inicio de sesión exitoso
            window.location.href = './../../paginas/tabla.html';
        }
    });

})