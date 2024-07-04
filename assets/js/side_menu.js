import { createClient } from '@supabase/supabase-js'

document.getElementById("menu-btn").addEventListener("click", function() {
    var sideMenu = document.getElementById("side-menu");
    if (sideMenu.style.left === "-250px") {
        sideMenu.style.left = "0";
    } else {
        sideMenu.style.left = "-250px";
    }
});


function openMenu() {
    menuOpen = true
    overlay.style.display = 'block'
    sidebar.style.width = '250px'
  }
  
  function closeMenu() {
    menuOpen = false
    overlay.style.display = 'none'
    sidebar.style.width = '0px'
  }


// Para cerrar sesión
async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out:', error)
        return
    }

    // Eliminar la sesión de LocalStorage
    localStorage.removeItem('supabaseSession')
    window.location.href = "../../paginas/login.html";

    console.log('User signed out')
}