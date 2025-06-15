"use server";

import { API_URL } from "@/lib/constants";
import { getUsername } from "@/utils/getUsername";
import { revalidatePath } from "next/cache";

export async function updateNoteAction(_, formData) {
  const _id = formData.get("_id");
  const title = formData.get("title");
  const content = formData.get("content");
  const contentPreview = content.slice(0, 200);
  const coverImage = formData.get("cover_image");
  const formerCoverImage = formData.get("former_cover_image");
  const username = await getUsername();
  let base64 = formerCoverImage;

  if (!title || !content) {
    return {
      status: "failed",
      message: "Title or content is empty",
    };
  }

  if (coverImage && coverImage.size !== 0) {
    const arrayBuffer = await coverImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    base64 = `data:${coverImage.type};base64,${buffer.toString("base64")}`;
  }

  await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id,
      username,
      title,
      content,
      content_preview: contentPreview,
      cover_image: base64 ?? "",
    }),
  });

  revalidatePath("/");

  return {
    status: "success",
    message:
      "Note updated!. Take a note, the content might updated after a couple of seconds. If you cant see any, just refresh it",
  };
}

export async function deleteNoteAction(_, formData) {
  const _id = formData.get("_id");

  await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([_id]),
  });

  revalidatePath("/");

  return {
    status: "success",
    message:
      "Note deleted!. Take a note, the content might deleted after a couple of seconds. If you cant see any, just refresh it",
  };
}
