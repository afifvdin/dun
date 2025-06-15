import { createNoteAction } from "./action";
import { NoteForm } from "../_components/note-form";

export default function Page() {
  return <NoteForm actionFn={createNoteAction} />;
}
