import { loginauth, q } from '/controllers/firebase.js'

// Selecciona los elementos del DOM
const caja = document.getElementById('formlog')

async function validar() {
  const email = caja['username'].value
  const password = caja['password'].value

  try {
    // Verifica las credenciales del usuario
    const verificar = await loginauth(email, password)
    
    if (verificar != null) {
      // Llama a la función 'q' para encontrar la colección del usuario
      const querySnapshot = await q(email)

      if (querySnapshot) {
        if (querySnapshot.collection === 'usuario') {
          alert('¡Bienvenido usuario!')
          window.location.href = '/menu'
        } else if (querySnapshot.collection === 'veterinaria') {
          alert('¡Bienvenido veterinario!')
          window.location.href = '/menu'
        }
      } else {
        console.log('No se encontró ningún usuario con ese email')
        alert('Error: No se encontró ningún usuario con ese email')
      }
    } else {
      console.log('Error de autenticación para el usuario: ' + email)
      alert('Error de usuario: Verifique usuario y/o contraseña')
    }
  } catch (error) {
    console.log('Error en el proceso de autenticación:', error)
    alert('Error en el proceso de autenticación')
  }
}

// Añade un listener al botón de login
caja.addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío del formulario
  console.log('botón pulsado')
  validar()
});
