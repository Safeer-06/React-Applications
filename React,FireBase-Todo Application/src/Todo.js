import { Button, ListItem, ListItemText, TextField } from '@material-ui/core'
import React from 'react';
import './Todo.css';
import { useState } from 'react';
import { deleteTodo, toggleInProgress, updateTodo } from './config/commonFunctions';

export default function TodoListItem({ todo, inprogress, id }) {
  const [newtoDos, setNewToDos] = useState([]);
  
  return (
    <div className="listitem">
      <ListItem>
        <ListItemText primary={"Name: "+todo} secondary={inprogress ? "Status: In progress" : "Status: Completed"}/>
      </ListItem>
      <Button onClick={(e) => { e.preventDefault(); toggleInProgress(id, inprogress)}}>
      {inprogress ? "Undone" : "Done"}
      </Button>
      <Button className="deletebtn" onClick={(e)=> { e.preventDefault(); deleteTodo(id)}}>
        X
      </Button>
      <form id="editForm">
      <TextField value={newtoDos} id="standard-basic" label="Edit value" onChange={(e) => 
        setNewToDos(e.target.value)
        } />
        <Button type="submit" variant="contained" style={{display:"none"}} onClick={(e) => { e.preventDefault(); updateTodo(id, newtoDos)}}>Default</Button>
        </form>
    </div>
  )
}
/*
<Button onClick={visibility}>
Edit
</Button>
*/
  // const toggleInProgress = () => {
  //   db.collection("todos").doc(id).update({
  //     inprogress: !inprogress
  //   })
  // }
  //const dbname = db;
  //const collectionName = "todos";
  // const deleteTodo = () => {
  //   console.log("sfasf");
  //   db.collection("todos").doc(id).delete();
  // }
  //deleteTodo(db, "todos",id);
  // const visibility = () => {
  //   var a = document.getElementById("editForm");
  //   console.log("next");
  //   a.style.display="inline-block";
  //   console.log("first");
  // }
  // const editTodo = (e) => {
  //   e.preventDefault();
  //   db.collection("todos").doc(id).update({
  //     todo: newtoDos
  //   })
  // }