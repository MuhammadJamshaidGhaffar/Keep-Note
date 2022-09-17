import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./style.module.css";
import { baseUrl } from "../../utility/globalConstants";
import {
  createOrUpdateNoteResponse,
  note,
  TYPE_OF_NOTE,
} from "../../types/note";
import {
  addNotes,
  setActiveNoteId,
  setNoteSwitch,
  setText,
  setTitle,
} from "../../store/reducer";
import { createNote, getNote, updateNote } from "../../utility/functions";

// import { createNewNote } from "../../utility/functions";

const NoteEditor: React.FC = () => {
  const noteTitleRef = useRef<HTMLInputElement>(null);
  const noteTextRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const noteSwitch: boolean = useSelector((state: any) => state.noteSwitch);
  const activeNoteId = useSelector((state: any) => {
    console.log("activen note id in seletor is : ", state);
    return state.activeNoteId;
  });
  const isNoteExisting: boolean = useSelector(
    (state: any) => state.otherObj.isNoteExisting
  );
  const [fetchingId, setFetchingId] = useState(false);
  const title = useSelector((state: any) => state.otherObj.title);
  const text = useSelector((state: any) => state.otherObj.text);
  useEffect(() => {
    async function getNoteAndUpdateUI() {
      console.log("getNote and update UI");
      const note: note = await getNote(activeNoteId);
      if (noteTitleRef.current !== null && noteTitleRef !== null)
        // noteTitleRef.current.value = note.title;
        setTitle(note.title);
      if (noteTextRef !== null && noteTextRef.current !== null)
        // noteTextRef.current.value = note.text;
        setText(note.text);
    }
    if (noteSwitch) {
      getNoteAndUpdateUI();
      dispatch(setNoteSwitch(false));
    }
  });
  async function fetchAndUpdateNote() {
    if (fetchingId) return;
    if (activeNoteId === "-1") {
      console.log("creating a new note");
      if (!fetchingId)
        try {
          setFetchingId(true);
          console.log("after setFetchingId(true)");
          const data: createOrUpdateNoteResponse = await createNote();
          console.log("CALLED");
          dispatch(setActiveNoteId(data.id));
          dispatch(addNotes(data.notes));
          setFetchingId(false);
        } catch (err) {
          console.log(err);
        }
    }
    if (fetchingId || activeNoteId == "-1") return;
    const NoteFromHtml = getNoteFromHtml(noteTitleRef, noteTextRef);
    try {
      const data: createOrUpdateNoteResponse = await updateNote(
        activeNoteId,
        NoteFromHtml?.title,
        NoteFromHtml?.text
      );
      dispatch(addNotes(data.notes));
      dispatch(setActiveNoteId(data.id));
    } catch (error) {
      console.log("Erro herer", error);
    }
  }
  console.log("Is Note Exisiting: ", isNoteExisting);
  return (
    <div className={` ${styles.noteDiv}`}>
      {" "}
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Title"
        inputRef={noteTitleRef}
        onChange={(e) => {
          dispatch(setTitle(e.target.value));
          fetchAndUpdateNote();
        }}
        style={{ width: "100%" }}
        color="success"
        value={title}
      />
      <TextField
        id="outlined-multiline-static"
        multiline
        minRows={4}
        maxRows={15}
        placeholder="Take a note..."
        style={{ width: "100%" }}
        color="success"
        inputRef={noteTextRef}
        onChange={(e) => {
          dispatch(setText(e.target.value));
          fetchAndUpdateNote();
        }}
        autoFocus={true}
        value={text}
      />
    </div>
  );
};

export default NoteEditor;

function getNoteFromHtml(titleRef: any, noteRef: any) {
  if (titleRef.current !== null && noteRef.current !== null) {
    return {
      title: titleRef.current.value || "",
      text: noteRef.current.value || "",
    };
  }
}
