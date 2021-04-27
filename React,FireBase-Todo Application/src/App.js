import './App.css';
import { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { addToDo, getToDos } from './config/commonFunctions';
import TodoListItem from './Todo';
function App() {
  const [toDos, setToDos] = useState([]);
  const [toDoInput, setToDoInput] = useState("");

  useEffect(() => {
    getToDos(setToDos);
  },[]) 

  return (
    <div className="App">
      <h1>TODO APPLICATION</h1>
      <form>
      <TextField className="textField" value={toDoInput} id="standard-basic" label="Write a todo" onChange={(e) => 
        setToDoInput(e.target.value)
        } />
        <Button type="submit" variant="contained" style={{display:"none"}} onClick={(e) => { e.preventDefault(); addToDo(toDoInput); setToDoInput("");}}>Default</Button>
        </form>
        <h3>List of Added Todos</h3>
        <div className="tododiv">
        {toDos.map((todo) => (
          <TodoListItem todo={todo.todo} inprogress={todo.inprogress} id={todo.id}/>
        ))}
        </div>
    </div>
  );
}
  //to save a single todo, going to create a hook to save a list of todos
//run only on first launch
  //Useeffect-> if u want to do something when value changes happen
  // const getToDos = () => {
  //   db.collection("todos").onSnapshot(function (querySnapshot) {
  //     querySnapshot.docs.map((doc) => {
  //       id: doc.id,
  //       todo: doc.data().todo,
  //       inprogress: doc.data().inprogress,
  //     }));
  //   })
  // }
  // const getToDos = () => {
  //   db.collection("todos").onSnapshot(function (querySnapshot) {
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
      
      //map thru snapshot and save it in todos}
  //get data from firebase:
  //.onsnapshot: new data added, instantly reflected on our list, it is real time reflection of db
  //.get: returns what we have at that moment, if we add new todos, wont be able to see them
  // const addToDo = (e) => {
  //    e.preventDefault();//prevent default function of button refresh
  //    console.log("first click");
  //   // console.log("u trying to add");
  //   //db.collection("collectionname").add();
  //     db.collection("todos").add({
  //       inprogress: true,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       todo: toDoInput,
  //     });
  //     setToDoInput("");//for clearing field of todo
  // }
{/* <TextField className="textField" value={toDoInput} id="standard-basic" label="Write a todo" onChange={(e) => {
        setToDoInput(e.target.value);
        console.log(`this is input: ${e.target.value}`);
        }} /> */}


export default App;
