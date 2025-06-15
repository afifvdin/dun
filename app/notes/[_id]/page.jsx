import { API_URL } from "@/lib/constants";
import { NoteForm } from "../_components/note-form";
import { updateNoteAction } from "./action";
import { NotFound } from "../_components/not-found";

export default async function Page({ params }) {
  const { _id } = await params;
  const res = await fetch(`${API_URL}/${_id}`);
  const note = await res.json();

  if (!note._id) {
    return <NotFound />;
  }

  return <NoteForm actionFn={updateNoteAction} note={note} _id={_id} />;
}
