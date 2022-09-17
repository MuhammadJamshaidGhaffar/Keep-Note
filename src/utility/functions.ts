import { createOrUpdateNoteResponse, note } from "../types/note";
import { baseUrl } from "./globalConstants";

export async function createNewNote(note: note) {
  try {
    const id = await (
      await fetch(`${baseUrl}/createnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      })
    ).text();
    return Number(id);
  } catch (err) {
    console.log(err);
    return -1;
  }
}

export async function createNote() {
  const data: createOrUpdateNoteResponse = await await (
    await fetch(`${baseUrl}/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "", text: "" }),
    })
  ).json();
  return data;
}
export async function updateNote(id: string, title: string, text: string) {
  const data: { id: string; notes: Required<note>[] } = await (
    await fetch(`${baseUrl}/updatenote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        text,
      }),
    })
  ).json();
  return data;
}

export async function getNote(id: string) {
  const data: Required<note> = (
    await (await fetch(`${baseUrl}/notes/${id}`)).json()
  ).note;
  console.log(`getting note no# ${id}  `, data);
  return data;
}
