"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExpandIcon } from "lucide-react";
import Link from "next/link";
import { createNoteAction } from "../new/action";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export const NewNoteDialog = () => {
  const [state, action, pending] = useActionState(createNoteAction, null);
  const [show, setShow] = useState(false);

  const handleOpenChange = (open) => {
    if (!open && pending) return;
    setShow(open);
  };

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message, { id: "newToast" });
      setShow(false);
    } else if (state?.status === "failed") {
      toast.error(state?.message, { id: "newToast" });
    }
  }, [state]);

  return (
    <Dialog open={show} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Add new</Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md max-h-[75vh]"
      >
        <Link
          href="/notes/new"
          className="text-neutral-700 text-xs absolute gap-2 top-4 flex items-center justify-center right-4 cursor-pointer hover:underline"
        >
          <span>Open in new page</span>
          <ExpandIcon className="size-3.5" />
        </Link>
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
          <DialogDescription>
            To add image cover, click "open in new page"
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="flex items-center gap-2 mb-4">
            <div className="grid flex-1 gap-2">
              <Input
                disabled={pending}
                name="title"
                type="text"
                placeholder="Title"
              />
              <Textarea
                disabled={pending}
                name="content"
                placeholder="Write something"
                className="leading-loose max-h-[40vh]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={pending} type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              disabled={pending}
              type="submit"
              onClick={() => {
                toast.loading("Adding new note...", { id: "newToast" });
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
