import {obtenerDatosUsuario, Crear_new_vet, buscarVeter,eliminarDocumento,actualizarDocumento } from './firebase.js';

const email = localStorage.getItem('uservEmail');

const modal = document.getElementById('modal-miv')
const cerrar = document.getElementById('btn_cerrar_m')
const abrir = document.getElementById('g_mbtn')
const navbarTitle = document.getElementById('navbar-title');
const tbodyMenuGest = document.getElementById('menu_gest');
const modal_new=document.getElementById('modal_new_veter')
const abrir_new=document.getElementById('new_veter')
const cerrar_new=document.getElementById('btn_cerrar_new')
const regi=document.getElementById('regis-vet')
const modal_ac=document.getElementById('modal_ac_veter')
const cerrar_ac=document.getElementById('btn_cerrar_ac')
const actu=document.getElementById('ac-vet')


async function busq() {
  const nombreVeterinaria = navbarTitle.textContent.trim();

    try {
        const veterinarios = await buscarVeter(nombreVeterinaria);

        tbodyMenuGest.innerHTML = '';

        veterinarios.forEach((veterinario) => {
          const tr = document.createElement('tr');
        
          tr.innerHTML = `
              <td>${veterinario.id}</td>
              <td>${veterinario.nombre}</td>
              <td>${veterinario.telefono}</td>
              <td>
                  <button class="editar-btn">Editar</button>
                  <button class="eliminar-btn" data-id="${veterinario.id}">Eliminar</button>
              </td>
          `;
        
          tbodyMenuGest.appendChild(tr);
        
          const eliminarBtn = tr.querySelector('.eliminar-btn');
          eliminarBtn.addEventListener('click', async () => {
            const idVeterinario = eliminarBtn.getAttribute('data-id');
            const confirmacion = confirm(`¿Estás seguro de eliminar el veterinario con ID: ${idVeterinario}?`);
          
            if (confirmacion) {
              try {
                await eliminarDocumento(idVeterinario); 
                alert('Veterinario eliminado exitosamente.');
                busq(); 
              } catch (error) {
                console.error('Error al eliminar el veterinario:', error);
                alert('Ocurrió un error al intentar eliminar el veterinario.');
              }
            }
          });
          const actualizar=tr.querySelector('.editar-btn')
          const n=document.getElementById('acN')
          const p=document.getElementById('acP')
          actualizar.addEventListener('click',async ()=>{
            modal.close()
            n.textContent = `Nombre: ${veterinario.nombre}`
            p.textContent = `Teléfono: ${veterinario.telefono}`

            document.getElementById('name_ac').value=veterinario.nombre
            document.getElementById('phoneac').value=veterinario.telefono

            modal_ac.showModal()
            
            actu.addEventListener('click', async()=>{
              const acDatos = {
                nombre: document.getElementById('name_ac').value,
                telefono: document.getElementById('phoneac').value
              }

              try{
                await actualizarDocumento(veterinario.id, acDatos)
                alert('Datos actualizados exitosamente')
                modal_ac.close()
                modal.showModal()
                busq()
              }catch (error){
                console.error(error)
                alert('error en la actualización de datos')
              }
            }, {once: true})
          })
        });

    } catch (error) {
        console.error('Error al buscar veterinarios:', error);
    }
}

async function registro() {
  const idv=document.getElementById('Idv').value
  const nom=document.getElementById('name_v').value
  const phv=document.getElementById('phonev').value

  try {
    const datosvet = await obtenerDatosUsuario(email);
    if (datosvet) {
      const nombres = datosvet.nombre || 'No disponible';

      const datos = async () => {
        try {
          return await Crear_new_vet(nom, idv, phv, nombres)
        } catch (error) {
          throw error
        }
      }
    
      try{
        const docRef = await datos()
        if(docRef.id){
          alert('veterinario registrado exitosamente')
          modal_new.close()
          modal.showModal()
          busq()
        }
      }catch(error){
        throw error
      }
    } else {
      console.log('No se encontraron datos para el email proporcionado.');
    }
  } catch (error) {
    throw error
  }
}


abrir.addEventListener("click",()=>{
  modal_new.close()
  modal.showModal()
  busq()
})

cerrar.addEventListener("click",()=>{
    modal.close()
})

abrir_new.addEventListener('click',()=>{
  modal.close()
  modal_new.showModal()
})

cerrar_new.addEventListener('click',()=>{
  modal_new.close()
})

regi.addEventListener('click',()=>{
  registro()
})

cerrar_ac.addEventListener('click',()=>{
  modal_ac.close()
  modal.showModal()
})
