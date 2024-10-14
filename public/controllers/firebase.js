// Importa las funciones necesarias de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js'

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc as firestoreDoc,
  getDoc as firestoreGetDoc,
  setDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo36uqGeuyaX0VxXgo_o5WNDl6OKVJZ94",
  authDomain: "toby-base-cac9b.firebaseapp.com",
  projectId: "toby-base-cac9b",
  storageBucket: "toby-base-cac9b.appspot.com",
  messagingSenderId: "956272419573",
  appId: "1:956272419573:web:2a0c12f09ea02929fddbbc",
  measurementId: "G-VC6DZP43KP"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage()
const db = getFirestore(app)

// autenticacion usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// cerrar sesion usuario
export const loginout = () => signOut(auth)

// estado del usuario
export function userstate() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('User ID:', uid);
    } else {
      console.log('No user is signed in');
      window.location.href = '/';
    }
  });
}

// crear nuevo usuario
export const registerAuth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)


// mensaje de confirmacion
export const mensajeA = () => sendEmailVerification(auth.currentUser)



// eliminar usuario
export function Deletuser() {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser
    if (user) {
      deleteUser(user)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      reject(new Error('No hay usuario autenticado'))
    }
  })
}

export async function eliminarCuenta(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser
    await deleteUser(user)
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error.message)
    alert('Error al eliminar la cuenta: ' + error.message)
  }
}

// Metodos de fireStore


// Agregar datos de usuario
export const CrearUsuario = async (
  id,
  nombres,
  email,
  numero,
  contraseña,
) => {
  try {
    const docRef = await addDoc(collection(db, 'usuario'), {
      id,
      nombres,
      email,
      numero,
      contraseña,
    })
    return docRef
  } catch (error) {
    throw error
  }
}

//datos de veterinaria

export const Crearveter = async (
  nombre,
  direccion,
  email,
  telefono,
  contraseña,
) => {
  try {
    const docRef = await addDoc(collection(db, 'veterinaria'), {
      nombre,
      direccion,
      email,
      telefono,
      contraseña,
    })
    return docRef
  } catch (error) {
    throw error
  }
}

//datos de veterinarios

export const Crear_new_vet = async (
  nombre,
  id,
  telefono,
  veterinaria,
) => {
  try {
    const docRef = await addDoc(collection(db, 'veterinarios'), {
      nombre,
      id,
      telefono,
      veterinaria,
    })
    return docRef
  } catch (error) {
    throw error
  }
}


// buscar datos

export const q = async (email) => {
  try {
    const usuariosRef = collection(db, 'usuario')
    const veterinariosRef = collection(db, 'veterinaria')

    let querySnapshot = await getDocs(
      query(usuariosRef, where('email', '==', email))
    )

    if (!querySnapshot.empty) {
      return { collection: 'usuario', querySnapshot }
    }

    querySnapshot = await getDocs(
      query(veterinariosRef, where('email', '==', email))
    )

    if (!querySnapshot.empty) {
      return { collection: 'veterinaria', querySnapshot }
    }

    return null
  } catch (error) {
    throw error
  }
}

//eliminar veterinario

export const eliminarDocumento = async (idVeterinario) => {
  try {
    const veterinariosRef = collection(db, 'veterinarios');

    const q = query(veterinariosRef, where('id', '==', idVeterinario));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(docSnapshot.ref);
    });

    console.log(`Documento con ID ${idVeterinario} eliminado exitosamente.`);
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
    throw error;
  }
};

export const doc = firestoreDoc
export const getDoc = firestoreGetDoc
export const Db = getFirestore(app)

// actualizar documento de veterinario
export const actualizarDocumento = async (idVeterinario, nuevosDatos) => {
  const db = getFirestore();
  const veterinariosRef = collection(db, "veterinarios");
  const b = query(veterinariosRef, where("id", "==", idVeterinario));

  try {
    const querySnapshot = await getDocs(b);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;  

      await updateDoc(docRef, nuevosDatos);
      console.log("Veterinario actualizado exitosamente");
    } else {
      console.error("Veterinario no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el veterinario:", error);
    throw error;
  }
};


export const obtenerDatosUsuario = async (email) => {
  try {
    const usuariosRef = collection(db, 'usuario');
    const q = query(usuariosRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      let datos = {};
      querySnapshot.forEach((doc) => {
        datos = doc.data();
      });
      return datos;
    }

    const veterinariosRef = collection(db, 'veterinaria');
    const qVete = query(veterinariosRef, where('email', '==', email));
    const querySnapshotVete = await getDocs(qVete);

    if (!querySnapshotVete.empty) {
      let datos = {};
      querySnapshotVete.forEach((doc) => {
        datos = doc.data();
      });
      return datos;
    }

    return null;
  } catch (error) {
    console.error('Error obteniendo datos del usuario:', error);
    throw error;
  }
};

// Buscar veterinarios 
export const buscarVeter = async (nombre) => {
  try {
    const veterinariosRef = collection(db, 'veterinarios');
    const q = query(veterinariosRef, where('veterinaria', '==', nombre));
    const querySnapshot = await getDocs(q);
    const veterinarios = [];

    querySnapshot.forEach((doc) => {
      veterinarios.push(doc.data());
    });

    return veterinarios;
  } catch (error) {
    console.error('Error obteniendo veterinarios:', error);
    throw error;
  }
};

// Veterinarias registradas

export const veterinarias_R= async ()=>{
  try {
    const veterinariasRef = collection(db, 'veterinaria');
    const querySnapshot = await getDocs(veterinariasRef);
    const veterinarias = [];

    querySnapshot.forEach((doc) => {
      veterinarias.push(doc.data());
    });

    return veterinarias;
  } catch (error) {
    console.error('Error obteniendo las veterinarias:', error);
    throw error;
  }
}

//Verificar que no hallan veterinarias ya registradas con los datos que se intentan registrar

export const Verificar_Ex_V = async(email, nombre)=>{
  try {
    const veterinariasRef = collection(db, 'veterinaria');
    
    // Verificar por correo
    const queryEmail = query(veterinariasRef, where('email', '==', email));
    const querySnapshotEmail = await getDocs(queryEmail);

    if (!querySnapshotEmail.empty) {
      return { exists: true, field: 'email' }; 
    }

    // Verificar por nombre
    const queryNombre = query(veterinariasRef, where('nombre', '==', nombre));
    const querySnapshotNombre = await getDocs(queryNombre);

    if (!querySnapshotNombre.empty) {
      return { exists: true, field: 'nombre' }; 
    }

    return { exists: false }; 
  } catch (error) {
    console.error('Error verificando la existencia de veterinaria:', error);
    throw error;
  }
}

//Verificar que no hallan usuarios ya registradas con el mismo id que se intenta registrar

export const Verificar_Us_Id=async(id)=>{

  try{
    const UserRef=collection(db,'usuario')

    const queryId=query(UserRef,where('id','==',id))
    const BusquedaId=await getDocs(queryId)

    if(!BusquedaId.empty){
      return { exists: true, field: 'id' };
    }

    return { exists: false }; 
  }catch (error) {
    console.error('Error verificando la existencia de usuario:', error);
    throw error;
  }
  
}