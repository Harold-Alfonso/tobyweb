import { veterinarias_R,buscarVeter} from './firebase.js';

const abrir_veter = document.getElementById('veterR');
const modal_veteri = document.getElementById('modal_veteri');
const serrar_mod = document.getElementById('btn_cerrar_mv');
const tabla_veter = document.getElementById('tabla_veter');
const modal_miv = document.getElementById('modal-miv')
const serrar_modalV = document.getElementById('btn_cerrar_m')
const tbodyMenuGest = document.getElementById('menu_gest')

async function Dveterinaria() {
    try {
        const veterinarias = await veterinarias_R();

        tabla_veter.innerHTML = '';
        veterinarias.forEach((veterinaria) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${veterinaria.nombre}</td>
                <td>${veterinaria.email}</td>
                <td>
                    <button class="busq-btn">Veterinarios</button>
                </td>
            `
            tabla_veter.appendChild(row);

            const busqueda=row.querySelector('.busq-btn')

            busqueda.addEventListener('click',async ()=>{
                modal_veteri.close()
                modal_miv.showModal()
                try{
                    const veterinarios = await buscarVeter(veterinaria.nombre);
                    const tit = document.getElementById('Nvet')

                    tit.textContent=`Veterinarios de ${veterinaria.nombre}`

                    tbodyMenuGest.innerHTML = '';

                    veterinarios.forEach((veterinario)=>{
                    const tr = document.createElement('tr');
        
                    tr.innerHTML = `
                        <td>${veterinario.id}</td>
                        <td>${veterinario.nombre}</td>
                        <td>${veterinario.telefono}</td>
                    `;
        
                    tbodyMenuGest.appendChild(tr);
                    })
                }catch (error) {
                    console.error('Error al buscar veterinarios:', error);
                }
            })
        });
    } catch (error) {
        console.error('Error al obtener veterinarias:', error);
    }
}

abrir_veter.addEventListener('click', async () => {
    modal_veteri.showModal();
    Dveterinaria()
});

serrar_mod.addEventListener('click', () => {
  modal_veteri.close();
});

serrar_modalV.addEventListener('click',()=>{
    modal_miv.close()
    modal_veteri.showModal()
    Dveterinaria()
})