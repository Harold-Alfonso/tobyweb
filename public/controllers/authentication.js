import { loginauth, q } from './firebase.js'


const caja = document.getElementById('formlog')

async function validar() {
  const email = caja['username'].value
  const password = caja['password'].value

  try {
    console.log('Iniciando proceso de autenticación');
    const verificar = await loginauth(email, password)

    console.log('Resultado de loginauth:', verificar);
    
    if (verificar != null) {
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


caja.addEventListener("submit", function(event) {
  event.preventDefault(); 
  validar()
});
