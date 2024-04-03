import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
);

document.getElementById('confirm-del').addEventListener('click', async () => {

    const id = document.getElementById("id-to-delete").value;
    const responseContainer = document.getElementById('del-response-cont');

    if(id == ""){
        responseContainer.innerHTML = "Ingresa un ID, Idiota.";
        return;
    }

    const { data, error } = await supabase
        .from('espacios_publicos')
        .delete()
        .eq('id', id);

        if (error) {
            console.error('Error al eliminar el registro:', error.message);
            responseContainer.innerHTML = 'rror al eliminar el registro:', error.message;
        } else {
        if (data && data.length > 0) {
            console.log('Registro eliminado exitosamente');
            responseContainer.innerHTML = "Registro eliminado exitosamente";
        } else {
            console.log('No se encontró ningún registro para eliminar');
            responseContainer.innerHTML = "No se encontró ningún registro para eliminar";
        }
        }

});

async function deletePublicSpace(){

    

}