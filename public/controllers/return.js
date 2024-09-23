import { q,userstate } from './firebase.js';

userstate()

// Recuperar el email desde localStorage
const email = localStorage.getItem('userEmail');
console.log('Email del usuario (desde localStorage):', email);

async function buscar() {
  if (email) {
    try {
      const querySnapshot = await q(email);

      if (querySnapshot) {
        if (querySnapshot.collection === 'usuario') {
          window.location.href = `/menu?email=${encodeURIComponent(email)}`;
        } else if (querySnapshot.collection === 'veterinaria') {
          window.location.href = `/menuVeter?email=${encodeURIComponent(email)}`;
        }
      } else {
        console.log('No se encontró ningún usuario con ese email');
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
    }
  }
}

const btn = document.getElementById('close');
btn.addEventListener('click', () => {
  alert('Saliendo de videollamada');
  buscar();
});