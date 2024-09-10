import {
    registerAuth,
    mensajeA,
    Crearveter,
  } from './firebase.js'
  
  const registrar = document.getElementById('regis-veter')
  
  async function registro() {
    const name = document.getElementById('Nveter').value
    const email = document.getElementById('email_veter').value
    const dir = document.getElementById('direc').value
    const phone = document.getElementById('tel').value
    const password = document.getElementById('pass_veter').value
  
    const validar = async () => {
      try {
        await registerAuth(email, password)
      } catch (error) {
        throw error
      }
    }
    const datos = async () => {
      try {
        return await Crearveter(name, dir, email, phone, password)
      } catch (error) {
        throw error
      }
    }
  
    try {
      await validar()
      const docRef = await datos()
      if (docRef.id) {
        alert('veterinaria registrada exitosamente')
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
  