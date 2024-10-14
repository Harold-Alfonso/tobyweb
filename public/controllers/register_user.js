import {
  registerAuth,
  mensajeA,
  CrearUsuario,
  Verificar_Us_Id
} from './firebase.js'

const registrar = document.getElementById('regis-us')

async function registro() {
  const us = document.getElementById('name_u').value
  const email = document.getElementById('email').value
  const id = document.getElementById('Id').value
  const phone = document.getElementById('phone').value
  const password = document.getElementById('passwordu').value

  const verificacion=await Verificar_Us_Id(id)
  if (verificacion.exists) {
    alert(`Error: Ya existe un usuario registrado con el mismo ${verificacion.field}.`)
    return 
  }

  const validar = async () => {
    try {
      await registerAuth(email, password)
    } catch (error) {
      throw error
    }
  }
  const datos = async () => {
    try {
      return await CrearUsuario(id, us, email, phone, password)
    } catch (error) {
      throw error
    }
  }

  try {
    await validar()
    const docRef = await datos()
    if (docRef.id) {
      alert('Usuario registrado exitosamente')
      await mensajeA()
      console.log('Correo electrónico de verificación enviado con éxito')
      window.location.href = '/'
    } else {
      alert('Error al registrar usuario')
    }
  } catch (error) {
    console.error(error)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  event.preventDefault(); 
  registrar.addEventListener('click', registro)
})
