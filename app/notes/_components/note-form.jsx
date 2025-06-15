"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ImageOffIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { deleteNoteAction } from "../[_id]/action";

export const NoteForm = ({ _id, note, actionFn }) => {
  const rotation = 4;
  const inputRef = useRef();
  const [state, action, pending] = useActionState(actionFn, null);
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteNoteAction,
    null
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    note ? note.cover_image : ""
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImageUrl(url);
    }
  };

  const handleClearImage = () => {
    if (inputRef) {
      setCoverImageUrl("");
      inputRef.value = "";
    }
  };

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message, { id: _id ? "updateToast" : "newToast" });
      redirect("/notes");
    } else if (state?.status === "failed") {
      toast.error(state?.message, { id: _id ? "updateToast" : "newToast" });
    }
  }, [state]);

  useEffect(() => {
    if (deleteState?.status === "success") {
      toast.success(deleteState?.message, { id: "deleteToast" });
      redirect("/notes");
    } else if (deleteState?.status === "failed") {
      toast.error(deleteState?.message, { id: "deleteToast" });
    }
  }, [deleteState]);

  return (
    <form className="max-w-4xl mx-auto p-4 sm:p-8 text-neutral-700">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/notes"
          className="flex items-center gap-2 tracking-tight text-neutral-500"
        >
          <ArrowLeftIcon className="size-3.5" />
          <span>Back to notes</span>
        </Link>
        <div className="flex justify-end items-center gap-2">
          {_id && (
            <>
              <input
                type="text"
                hidden
                defaultValue={_id}
                readOnly
                name="_id"
              />
              <Button
                disabled={deletePending}
                formAction={deleteAction}
                onClick={() => {
                  toast.loading("Deleting note...", {
                    id: "deleteToast",
                  });
                }}
                size="icon"
                variant="secondary"
              >
                <TrashIcon className="size-4 text-red-500" />
              </Button>
            </>
          )}
          <Button
            disabled={pending}
            formAction={action}
            onClick={() => {
              toast.loading(_id ? "Updating note..." : "Adding new note...", {
                id: _id ? "updateToast" : "newToast",
              });
            }}
          >
            Save changes
          </Button>
        </div>
      </div>
      {_id && (
        <p className="text-xs text-neutral-500 py-2">
          Written by: {note.username}
        </p>
      )}
      <div className="py-4 flex flex-col gap-8">
        <div
          style={{
            "--degree": `${rotation}deg`,
          }}
          className="group rotate-(--degree) relative size-64 overflow-hidden rounded-3xl shadow cursor-pointer hover:shadow-lg top-0 hover:-top-1 transition-all flex flex-col items-center justify-center"
        >
          {coverImageUrl && (
            <>
              <div className="group z-5 absolute left-0 top-0 w-full flex items-center justify-end p-4 gap-2">
                <Button
                  onClick={handleClearImage}
                  className="transition-all opacity-0 group-hover:opacity-100 !p-2 !w-auto !h-auto bg-white/20 text-neutral-700 hover:bg-white/40 hover:text-red-700"
                  size="icon"
                >
                  <TrashIcon />
                </Button>
              </div>
              <Image
                src={coverImageUrl}
                fill
                alt="pic"
                className="bg-cover object-cover rounded-2xl pointer-events-none"
              />
            </>
          )}
          <input
            type="text"
            defaultValue={note ? note.cover_image : ""}
            readOnly
            name="former_cover_image"
            hidden
          />
          <input
            disabled={pending}
            onChange={handleImageChange}
            name="cover_image"
            ref={inputRef}
            type="file"
            className="z-1 h-full w-full absolute top-0 left-0 cursor-pointer text-transparent border-8 rounded-3xl"
          />
          <ImageOffIcon className="size-8 text-neutral-300" />
          <p className="text-neutral-300 tracking-tight">Click to add image</p>
        </div>
        <input
          disabled={pending}
          name="title"
          className="outline-none text-4xl font-semibold tracking-tighter placeholder:text-neutral-300"
          placeholder="Title"
          defaultValue={_id && note ? note.title : ""}
        />
        <textarea
          disabled={pending}
          name="content"
          className="outline-none resize-none field-sizing-content leading-loose"
          placeholder="Write whatever..."
          defaultValue={_id && note ? note.content : ""}
        />
      </div>
    </form>
  );
};
