export type note = {
  title: string;
  text: string;
  id?: string;
};

export enum TYPE_OF_NOTE {
  NEW,
  EXISTING,
}

export type createOrUpdateNoteResponse = {
  id: string;
  notes: Required<note>[];
};
