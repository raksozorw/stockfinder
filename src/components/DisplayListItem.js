import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebaseConfig";
import Button from "@material-ui/core/Button";

export default function DisplayListItem(props) {
  const userId = useSelector((state) => state.auth.userId);
  const [input, setInput] = useState("");
  const [editActive, setEditActive] = useState(false);

  const handleDelete = () => {
    db.ref(`lists/${userId}/${props.index}`).remove();
  };

  const handleUpdate = () => {
    if (input !== "") {
      db.ref(`lists/${userId}/${props.index}`).set(input);
    }
    setEditActive(false);
  };

  const handleEdit = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <div className='full-item'>
      {!editActive && (
        <div className='item-and-buttons-grid'>
          <div className='item-text' onClick={() => setEditActive(true)}>
            {props.item}
          </div>
          <div className='buttons'>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => {
                setEditActive(true);
              }}
            >
              Edit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
      {editActive && (
        <div
          className='item-and-buttons-grid'
          onBlur={() => {
            handleUpdate();
          }}
        >
          <form
            onSubmit={(e) => {
              handleUpdate();
              e.preventDefault();
            }}
          >
            <input
              className='edit-input'
              autoFocus={true}
              defaultValue={props.item}
              onChange={handleEdit}
            ></input>
          </form>
          <div className='buttons'>
            <Button variant='contained' color='primary' onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
