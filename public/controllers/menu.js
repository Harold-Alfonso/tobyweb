import { obtenerDatosUsuario, userstate, loginout } from './firebase.js';

userstate()

const logout = document.getElementById('logoutBtn')

//función para cerrar sesión

async function cerrarsesion() {
  const verificacion = loginout()
  const comprobar = await verificacion

    .then((comprobar) => {
      alert('sesion cerrada')
      window.location.href = '/'
    })
    .catch((error) => {
      alert('Sesion no cerrada')
    })
}

// Función para obtener parámetros de localStore

const email = localStorage.getItem('usernEmail');
console.log('Email del usuario:', email);

const nameus = document.getElementById('navbar-title');
const us = document.getElementById('em_title');

// Llamar a la función para obtener los datos del usuario
async function cargarDatosUsuario(email) {
  try {
    const datos = await obtenerDatosUsuario(email);
    if (datos) {
      const nombres = datos.nombres || 'No disponible';
      const email = datos.email || 'No disponible';

      localStorage.setItem('userEmail', email);
      nameus.textContent = `Bienvenido ${nombres}`;
      us.textContent = `${email}`;
    } else {
      console.log('No se encontraron datos para el email proporcionado.');
    }
  } catch (error) {
    console.error('Error cargando datos del usuario:', error);
  }
}

cargarDatosUsuario(email);

export const em = document.getElementById('em_title').value

// Script para manejar las salas de videollamadas
document.getElementById('joinCallBtn').addEventListener('click', async function() {
    const modal = document.getElementById('joinCallModal');
    const roomSelect = document.getElementById('roomSelect');
    roomSelect.innerHTML = ''; 

    const response = await fetch('/active-rooms');
    const rooms = await response.json();

    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room;
        option.textContent = room;
        roomSelect.appendChild(option);
    });

    modal.style.display = 'block';
});

document.getElementById('joinRoomBtn').addEventListener('click', function() {
    const roomId = document.getElementById('roomSelect').value;
    if (roomId) {
        window.location.href = `/videocall/${roomId}`;
    }
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('joinCallModal').style.display = 'none';
});

window.addEventListener('DOMContentLoaded', async () => {
  logout.addEventListener('click', cerrarsesion)
})