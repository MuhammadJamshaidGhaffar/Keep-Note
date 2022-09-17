import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noteEdiotrStyles from "./components/NoteEditor/style.module.css";

import "./App.css";
import Note from "./components/note/note";
import NewNote from "./components/NewNote/NewNote";
import { addNotes, setActiveNoteId, setIsNoteExisting } from "./store/reducer";
import { note } from "./types/note";
import { createNewNote } from "./utility/functions";
import { baseUrl } from "./utility/globalConstants";
import { TYPE_OF_NOTE } from "./types/note";
import { Button, TextField, Typography } from "@mui/material";
import NoteEditor from "./components/NoteEditor/NoteEditor";

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [isFetching, setFetching] = useState(false);
  // const [activeNoteId, setActiveNoteId] = useState("-1");
  const isNoteExisting: boolean = useSelector(
    (state: any) => state.otherObj.isNoteExisting
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchNotes() {
      setFetching(true);
      let notes: Required<note>[] = await (
        await fetch(`${baseUrl}/getallnotes`)
      ).json();
      console.log("inside useffect", notes);
      dispatch(addNotes(notes));
      setFetching(false);
    }
    fetchNotes();
  }, []);

  const notes = useSelector((state: any): Required<note>[] => {
    console.log("Inside useSelector", state);
    return state.notesReducer;
  });
  const activeNoteId = useSelector((state: any) => {
    console.log("activen note id in seletor is : ", state);
    return state.activeNoteId;
  });
  console.log("Notes are", notes);
  if (isFetching) {
    return <CircularProgress color="success" />;
  }
  return (
    <div className="App">
      <h1 className="heading">JAMSHAID KEEP</h1>
      {activeNoteId === "-1" ? (
        <NewNote />
      ) : (
        <div
          className={`${
            isNoteExisting
              ? noteEdiotrStyles.existingNoteDiv
              : noteEdiotrStyles.newNoteDiv
          }`}
        >
          <NoteEditor />
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatch(setActiveNoteId("-1"));
              dispatch(setIsNoteExisting(false));
            }}
          >
            Close
          </Button>
        </div>
      )}

      <div className="notes-card-div">
        {notes.map((note, index) => (
          <Note id={note.id} text={note.text} title={note.title} key={index} />
        ))}
      </div>
      {isNoteExisting ? (
        <div className={"existing-note-back-cover"}></div>
      ) : null}
    </div>
  );
}

export default App;
