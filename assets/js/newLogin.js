import { createClient } from '@supabase/supabase-js';

// Crear un cliente de Supabase para interactuar con la base de datos
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
);

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const numeroEmpleadoInput = document.getElementById('numeroEmpleado');
    const contrasenaInput = document.getElementById('contrasena');
    const errorMessage = document.getElementById('errorMessage');

    loginButton.addEventListener('click', iniciarSesion);

    async function iniciarSesion() {
        const numEmpleado = numeroEmpleadoInput.value;
        const contrasena = contrasenaInput.value;
        try {
            // Realizar una consulta a la tabla "encargados_espacios_publicos" para verificar las credenciales
            const { data, error } = await supabase
                .from('encargados_espacios_publicos')
                .select()
                .eq('num_empleado', numEmpleado)
                .eq('password', contrasena)
                .single();

            if (error) {
                throw error;
            }

            if (data) {
                // Si las credenciales son correctas, redirigir a la página deseada
                window.location.href = '../paginas/tabla.html';
            } else {
                // Mostrar mensaje de error solo si no se redirige
                setTimeout(() => {
                    if (!window.location.href.includes('tabla.html')) {
                        errorMessage.style.display = 'block';
                    }
                }, 1000); // Esperar 1 segundo antes de mostrar el mensaje de error
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    }
});
