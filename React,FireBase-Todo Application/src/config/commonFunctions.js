import { db } from '../firebase_config';
import firebase from "firebase";
const dbcollectionName = db.collection("todos");
export const toggleInProgress = (id, inprogress) => {
    dbcollectionName.doc(id).update({
      inprogress: !inprogress
    })
  }
export const updateTodo = (id, newtoDos) => {
    dbcollectionName.doc(id).update({
      todo: newtoDos
    })
  }
export const deleteTodo = (id) => {
  dbcollectionName.doc(id).delete();
}

export const addToDo = (toDoInput) => {
   dbcollectionName.add({
     inprogress: true,
     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
     todo: toDoInput,
   });
}

export const getToDos = (setToDos) => {
  dbcollectionName.onSnapshot(function (querySnapshot) {
    setToDos(querySnapshot.docs.map((doc) => (
      {
        id: doc.id,
        todo: doc.data().todo,
        inprogress: doc.data().inprogress
      }
    )
    ));
  }
  )
}
// export const sortalphabetically = () => {

// }
// export const sortbydate = () => {

// }
// export const getToDos = () => {
//   db.collection(collectionName).onSnapshot(function (querySnapshot) {
//     setToDos(querySnapshot.docs.map((doc) => (
//       {
//         id: doc.id,
//         todo: doc.data().todo,
//         inprogress: doc.data().inprogress
//       }
//     )
//     ));
//   }
//   )
// }