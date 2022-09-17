import CircularProgress from "@mui/material/CircularProgress";
import CloudIcon from "@mui/icons-material/Cloud";
import DoneIcon from "@mui/icons-material/Done";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noteEdiotrStyles from "./components/NoteEditor/style.module.css";

import "./App.css";
import Note from "./components/note/note";
import NewNote from "./components/NewNote/NewNote";
import {
  addNotes,
  setActiveNoteId,
  setIsNoteExisting,
  setNewNote,
  setSyncing,
  setText,
  setTitle,
} from "./store/reducer";
import { note } from "./types/note";

import { baseUrl } from "./utility/globalConstants";

import { Button } from "@mui/material";
import NoteEditor from "./components/NoteEditor/NoteEditor";

function App() {
  const [isFetching, setFetching] = useState(false);
  const syncing = useSelector((state: any) => state.otherObj.syncing);

  const isNoteExisting: boolean = useSelector(
    (state: any) => state.otherObj.isNoteExisting
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchNotes() {
      setFetching(true);
      dispatch(setSyncing(true));
      let notes: Required<note>[] = await (
        await fetch(`${baseUrl}/getallnotes`)
      ).json();
      console.log("inside useffect", notes);
      dispatch(addNotes(notes));
      setFetching(false);
      dispatch(setSyncing(false));
    }
    fetchNotes();
  }, []);

  const notes = useSelector((state: any): Required<note>[] => {
    console.log("Inside useSelector", state);
    return state.notesReducer;
  });

  const isNewNote = useSelector((state: any) => state.otherObj.isNewNote);
  console.log("Notes are", notes);
  return (
    <div className="App">
      <div className="heading-wrapper">
        <h1 className="heading">JAMSHAID KEEP</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CloudIcon
            color="primary"
            style={{ fontSize: "3rem", marginLeft: "2rem" }}
          />
          {syncing ? (
            <CircularProgress
              color="success"
              size="2rem"
              style={{ marginLeft: "1rem" }}
            />
          ) : (
            <DoneIcon
              color="success"
              style={{ fontSize: "2rem", marginLeft: "1rem" }}
            />
          )}
        </div>
      </div>
      {isNewNote ? (
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
              dispatch(setText(""));
              dispatch(setTitle(""));
              dispatch(setNewNote(true));
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
