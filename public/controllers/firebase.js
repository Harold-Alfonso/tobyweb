// Importa las funciones necesarias de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  deleteUser,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js'

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
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'

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
const providerGoogle = new GoogleAuthProvider()
const providerFabook = new FacebookAuthProvider()
const db = getFirestore(app)

// autenticacion usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// cerrar sesion usuario
export const loginout = () => signOut(auth)

// estado del usuario
export function userstate() {
  onAuthStateChanged(auth, (user) => {
    const uid = user.uid
    console.log(uid)
    if (user) {
    } else {
      window.location.href = '../index.html'
    }
  })
}

// crar nuevo usuario
export const registerAuth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

// inicio con Google
export const loginGoogle = () => signInWithPopup(auth, providerGoogle)

// mensaje de confirmacion
export const mensajeA = () => sendEmailVerification(auth.currentUser)

// mensaje de cambio de contraseña
export const cambiar = (email) => sendPasswordResetEmail(auth, email)

// inicio sesion con Facebook
export const loginFacebook = () => signInWithPopup(auth, providerFabook)
export const providerFacebook = new FacebookAuthProvider()

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


/*// Agregar datos de usuario
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
      RH,
      email,
      numero,
      contraseña,
    })
    return docRef
  } catch (error) {
    throw error
  }
}*/

// Leer Datos

export const viewdates = () => getDocs(collection(db, 'usuario'))

// buscar datos

export const userCollectionRef = collection(db, 'usuario')

export const q = async (email) => {
  try {
    // Referencia a la colección de "usuarios"
    const usuariosRef = collection(db, 'usuario')
    const veterinariosRef = collection(db, 'veterinaria')

    // Buscar en la colección de "usuarios"
    let querySnapshot = await getDocs(
      query(usuariosRef, where('email', '==', email))
    )

    if (!querySnapshot.empty) {
      return { collection: 'usuarios', querySnapshot }
    }

    // Si no se encuentra en "usuarios", buscar en "veterinarios"
    querySnapshot = await getDocs(
      query(veterinariosRef, where('email', '==', email))
    )

    if (!querySnapshot.empty) {
      return { collection: 'veterinarios', querySnapshot }
    }

    // Si no se encuentra en ninguna colección, retornar null
    return null
  } catch (error) {
    throw error
  }
}

//  eliminar un documento Firestore
export const eliminarDocumento = (coleccion, idDocumento) => {
  return deleteDoc(doc(db, coleccion, idDocumento))
}

export const doc = firestoreDoc
export const getDoc = firestoreGetDoc
export const Db = getFirestore(app)

// agregar datos con ID

export const setregister = (codigo, name, descrp, cant, img) =>
  setDoc(doc(db, 'cities', codigo), {
    codigo,
    name,
    country,
    cant,
    img,
  })

// leer registro especifico

export const Getregister = (codigo) => (getDoc = doc(db, 'cities', codigo))

// actualizar documento
export const actualizarDocumento = async (docRef, data) => {
  try {
    await updateDoc(docRef, data)
    console.log('Documento actualizado exitosamente')
  } catch (error) {
    console.error('Error al actualizar el documento:', error)
    throw error
  }
}

//funciones de storage

export const archivoimg = async (file, referencia) => {
  const storageref = ref(storage, 'avatars/${referencia}/${file.name}')
  await uploadBytes(storageref, file)
  const url = await getDownloadURL(storageref)
  return url
}
