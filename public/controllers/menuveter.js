import { obtenerDatosUsuario } from './firebase.js';

// Función para obtener parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const email = getQueryParam('email');
console.log('Email del usuario:', email);

const nameus = document.getElementById('navbar-title');

// Llamar a la función para obtener los datos del usuario
async function cargarDatosUsuario(email) {
  try {
    const datos = await obtenerDatosUsuario(email);

    if (datos) {
      const nombres = datos.nombre || 'No disponible';
      const dir = datos.direccion || 'No disponible';
      const tel = datos.telefono || 'No disponible';
      const email = datos.email || 'No disponible';

      localStorage.setItem('userEmail', email);
      nameus.textContent = `${nombres}`;
    } else {
      console.log('No se encontraron datos para el email proporcionado.');
    }
  } catch (error) {
    console.error('Error cargando datos del usuario:', error);
  }
}

cargarDatosUsuario(email);

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
        window.location.href = `/videocall/${roomId}?email=${encodeURIComponent(email)}`;
    }
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('joinCallModal').style.display = 'none';
});
