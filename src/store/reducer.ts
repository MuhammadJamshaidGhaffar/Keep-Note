import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { note } from "../types/note";

const initialState: note[] = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state: note[], { payload }: { payload: Required<note>[] }) => {
      console.log("inside ayload", payload);
      return payload;
    },
    addNote: (state: note[], { payload }: { payload: Required<note> }) => {
      if (state.findIndex((elm) => elm.id === payload.id) === -1)
        state.push(payload);
    },
    // deleteNote: (state: note[], { payload }: { payload: number }) => {
    //   const index = state.findIndex((elm) => {
    //     if (elm.id == payload) return true;
    //   });
    //   if (index != -1) state.splice(index, 1);
    // },
  },
});

const idSlice = createSlice({
  name: "Active Note Id",
  initialState: "-1",
  reducers: {
    setActiveNoteId: (state: string, { payload }: { payload: string }) => {
      return payload;
    },
  },
});
const noteSwitchSlice = createSlice({
  name: "noteSwitch",
  initialState: false,
  reducers: {
    setNoteSwitch: (state: boolean, { payload }: { payload: boolean }) => {
      return payload;
    },
  },
});

const othersSlice = createSlice({
  name: "Others Object",
  initialState: {
    isNoteExisting: false,
    text: "",
    title: "",
    isNewNote: true,
    syncing: false,
  },
  reducers: {
    setIsNoteExisting: (state, { payload }: { payload: boolean }) => {
      state.isNoteExisting = payload;
    },
    setText: (state, { payload }: { payload: string }) => {
      state.text = payload;
    },
    setTitle: (state, { payload }: { payload: string }) => {
      state.title = payload;
    },
    setNewNote: (state, { payload }) => {
      state.isNewNote = payload;
    },
    setSyncing: (state, { payload }) => {
      state.syncing = payload;
    },
  },
});

export const { addNotes } = notesSlice.actions;
export const { setActiveNoteId } = idSlice.actions;
export const { setNoteSwitch } = noteSwitchSlice.actions;
export const { setIsNoteExisting, setText, setTitle, setNewNote, setSyncing } =
  othersSlice.actions;
const notesReducer = notesSlice.reducer;
const activeNoteId = idSlice.reducer;
const noteSwitch = noteSwitchSlice.reducer;
const otherObj = othersSlice.reducer;
export const rootReducer = combineReducers({
  notesReducer,
  activeNoteId,
  noteSwitch,
  otherObj,
});
