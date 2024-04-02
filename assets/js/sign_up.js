import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.REST_URL, process.env.REST_PUBLIC_KEY)

document.getElementById('sign-up-form').addEventListener('submit',function(event){
    event.preventDefault(); // Prevenir el comportamiento por defecto de enviar un formulario

    // Obtener los valores del formulario
    const email = document.getElementById('sign-up-correo').value;
    const password = document.getElementById('sign-up-password').value;

    // Aquí puedes agregar tu lógica para iniciar sesión, por ejemplo, usando Supabase, Firebase, etc.
    console.log('Registrando...', email, password);

    signUpNewUser(email, password);
      

})

async function signUpNewUser(email, password) {

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    }).then(response => {
        if(response.error){
            console.log('Error en registro de usuarios:', response.error);
        }else{
            console.log('Registro exitoso:', response.user);
            //Indica en la pagina que se registró un usuario
            document.getElementById('mensaje_sign_up').innerHTML = "Registro exitoso!, por favor, verifique su correo";

        }
    })

}