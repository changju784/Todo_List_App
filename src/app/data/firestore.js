import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc, Timestamp } from "firebase/firestore";

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
  querySnapshot.forEach((doc) => {
    const aTodo = {
      id: doc.id, 
      name: doc.data()["name"],
      isDone: doc.data()["isDone"],
      retrievedAt: doc.data()["retrievedAt"].toDate()
    }
    // console.log(`Fetched data id: ${doc.id} => ${doc.data()}`);
    fetchedData.push(aTodo)
  });
  return fetchedData
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
  return newTodoData
}
