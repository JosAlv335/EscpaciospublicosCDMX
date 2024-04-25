import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://zrwtmvescjmkdenhdaqh.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3RtdmVzY2pta2RlbmhkYXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MDA2ODEsImV4cCI6MjAyNTE3NjY4MX0.nWS7r3cCN_xhpTehJk71wQ19C7JsBuhF66MamPHpNWs"
)

document.getElementById('submit-id-file').addEventListener('click', async ()=>{

    var fileContainer = document.getElementById('identificacion-file');
    var archivo = fileContainer.files[0];

    console.log(archivo);

    var newFileName = await generateNewFileName('identification_files','encargados');

    let { data, error } = await supabase.storage
    .from('identification_files')
    .upload(newFileName,archivo, {
        cacheControl: '3600',
        upsert: false
    });

    if(error){
        console.log("Ocurrió un error al subir el archivo: " + error);
        alert("No se pudo subir el archivo, inténtelo de nuevo más tarde");
        return;
    }

    console.log("Archivo subido con éxito! " + data);

})

async function generateNewFileName(bucketName, folderPath) {
  try {
    // Lista todos los archivos en el bucket y carpeta especificados
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath, {
        limit: 100, // Ajusta este límite según tus necesidades
        offset: 0, // Comienza desde el inicio del bucket
        sortBy: { column: 'created_at', order: 'desc' }, // Opcional
      });

    if (error) {
      throw error;
    }

    // Genera un nuevo nombre de archivo usando un UUID y un timestamp para asegurar unicidad
    const timestamp = new Date().getTime();
    const newFileName = `${folderPath}/archivo_${timestamp}`;

    return newFileName;
  } catch (error) {
    console.error('Error al generar un nuevo nombre de archivo:', error.message);
    return null;
  }
}