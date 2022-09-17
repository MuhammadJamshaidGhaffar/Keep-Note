import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { createNote } from "../../utility/functions";
import { createOrUpdateNoteResponse } from "../../types/note";
import {
  addNotes,
  setActiveNoteId,
  setIsNoteExisting,
  setNewNote,
  setText,
  setTitle,
} from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import NoteEditor from "../NoteEditor/NoteEditor";
import styles from "../NoteEditor/style.module.css";

function NewNote() {
  const [isNewNotebtnClicked, setNewNoteBtnClicked] = useState(false);
  const activeNoteId = useSelector((state: any) => state.activeNoteId);
  const dispatch = useDispatch();
  return (
    <div className={styles.newNoteDiv}>
      {isNewNotebtnClicked ? (
        <>
          <NoteEditor />
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setNewNoteBtnClicked(false);
              dispatch(setActiveNoteId("-1"));
              dispatch(setText(""));
              dispatch(setTitle(""));
              dispatch(setNewNote(true));
            }}
          >
            Close
          </Button>
        </>
      ) : (
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Title"
          onClick={async () => {
            setNewNoteBtnClicked(true);
            dispatch(setIsNoteExisting(false));
          }}
          style={{ width: "100%" }}
          color="success"
        />
      )}
    </div>
  );
}

export default NewNote;
