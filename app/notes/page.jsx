import { API_URL } from "@/lib/constants";
import { NewNoteDialog } from "./_components/new-note-dialog";
import { getUsername } from "@/utils/getUsername";
import { NoteCard } from "@/components/globals/note-card";

export default async function Page() {
  const username = await getUsername();
  const res = await fetch(API_URL);
  const data = await res.json();
  const notes = data.data;

  return (
    <main>
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <p className="text-xs text-neutral-500">Logged as {username}</p>
        <div className="flex flex-col items-center py-24 gap-4">
          <div className="text-center">
            <h1 className="font-semibold tracking-tighter text-7xl text-neutral-700">
              Dump Ur Notes
            </h1>
            <p className="text-neutral-500 tracking-tight">
              Write whatever. Remove whenever.
            </p>
          </div>
          <NewNoteDialog />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {notes.map((note) => {
            return (
              <NoteCard
                key={note._id}
                _id={note._id}
                coverImage={note.cover_image}
                title={note.title}
                contentPreview={note.content_preview}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
