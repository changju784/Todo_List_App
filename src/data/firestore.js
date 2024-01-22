import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc, deleteDoc, updateDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read all todos from db
export async function fetchTodos() { 
  const querySnapshot = await getDocs(collection(db, "todos"));
  const fetchedData = [];

  if (querySnapshot.empty) {
    return fetchedData;
  }

  querySnapshot.forEach((doc) => {
    const aTodo = {
      id: doc.id, 
      name: doc.data()["name"],
      isDone: doc.data()["isDone"],
      createdAt: doc.data()["createdAt"].toDate()
    }
    fetchedData.push(aTodo)
  });
  return fetchedData
}

// Read a todo from db
export async function fetchATodo( id ) { 
  if (id === null) return null;
  const todoRef = doc(db, "todos", id);
  const todoDocSnap = await getDoc(todoRef)
  
  if (todoDocSnap.exists()) {
    const fetchedTodo = {
      id: todoDocSnap.id, 
      name: todoDocSnap.data()["name"],
      isDone: todoDocSnap.data()["isDone"],
      createdAt: todoDocSnap.data()["createdAt"].toDate()
    }
    return fetchedTodo
  }
  return null;
}

// Write a todo to db
export async function addATodo( name ) { 
  const newTodoRef = doc(collection(db, "todos"));
  const createdAt = Timestamp.fromDate(new Date());
  const newTodoData = {
    id: newTodoRef.id,
    name: name, 
    isDone: false,
    createdAt: createdAt
  }
  await setDoc(newTodoRef, newTodoData);
  return { ...newTodoData, createdAt: createdAt.toDate() }
}

// Delete a todo from db
export async function deleteATodo( id ) { 

  const fetchedTodo = await fetchATodo(id);
  if (fetchedTodo === null) {
    return null;
  }

  await deleteDoc(doc(db, "todos", id));
  return fetchedTodo;
}

// Update a todo from db
export async function updateATodo( id, { name, isDone } ) { 

  const fetchedTodo = await fetchATodo(id);
  if (fetchedTodo === null) {
    return null;
  }

  const todoRef = doc(db, "todos", id);
  await updateDoc(todoRef, {
    name: name, 
    isDone: isDone,
  })
  return {
    id: id,
    name: name, 
    isDone: isDone,
    createdAt: fetchedTodo.createdAt,
  };
}

