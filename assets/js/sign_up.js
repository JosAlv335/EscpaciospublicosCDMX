import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)
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

    var responseMessage = document.getElementById('mensaje_sign_up');

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if(error){
        console.log('Error en registro de usuarios:', response.error);
        document.getElementById('mensaje_sign_up').innerHTML = "Hubo un error en el registro: " + error;
        return;
    }

    const { userData, userError } = await supabase
        .schema('auth')
        .from('users')
        .select('email')
        .eq(email);

    if(userError){
        responseMessage.innerHTML = "No se pudo recuperar la información del usuario: " + error;
        return;        
    }

    const { pubUData, pubUError } = await supabase
        .schema("public")
        .from('users')
        .insert({
            id: data.id,
            nombre: document.getElementById('sign-up-name').value.trim(),
            apellido1: document.getElementById('sign-up-apellido1').value.trim(),
            apellido2: document.getElementById('sign-up-apellido2').value.trim(),
            correo: document.getElementById('sign-up-correo').value.trim()
    })

    console.log('Registro exitoso:', response.user);
    //Indica en la pagina que se registró un usuario
    responseMessage.innerHTML = "Registro exitoso!, por favor, verifique su correo";



    
    

}