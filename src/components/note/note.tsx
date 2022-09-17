import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  addNotes,
  setActiveNoteId,
  setIsNoteExisting,
  setNoteSwitch,
} from "../../store/reducer";
import { note } from "../../types/note";
import { baseUrl } from "../../utility/globalConstants";
import styles from "./style.module.css";

const Note: React.FC<Required<note>> = ({ id, text, title }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.div}>
      <div
        className={styles.crossBtn}
        onClick={async () => {
          console.log("Cross clciked of id ", id);
          const notes: Required<note>[] = await (
            await fetch(`${baseUrl}/notes/delete/${id}`)
          ).json();
          dispatch(addNotes(notes));
        }}
      >
        <IconButton aria-label="delete" size="small" color="success">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>

      <div
        className={styles.cardDiv}
        onClick={() => {
          dispatch(setActiveNoteId(id));
          dispatch(setNoteSwitch(true));
          dispatch(setIsNoteExisting(true));
        }}
      >
        <p>{id}</p>
        <p>{title}</p>
        {text.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};
export default Note;
