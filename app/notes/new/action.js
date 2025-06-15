"use server";

import { API_URL } from "@/lib/constants";
import { getUsername } from "@/utils/getUsername";
import { revalidatePath } from "next/cache";

export async function createNoteAction(_, formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const contentPreview = content.slice(0, 200);
  const coverImage = formData.get("cover_image");
  const username = await getUsername();
  let base64 = "";

  if (!title || !content) {
    return {
      status: "failed",
      message: "Title or content is empty",
    };
  }

  if (coverImage) {
    if (typeof coverImage === "string") {
      base64 = coverImage;
    } else if (coverImage.size !== 0) {
      const arrayBuffer = await coverImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      base64 = `data:${coverImage.type};base64,${buffer.toString("base64")}`;
    }
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        username,
        title,
        content,
        content_preview: contentPreview,
        cover_image: base64 ?? "",
      },
    ]),
  });

  revalidatePath("/");

  return {
    status: "success",
    message:
      "Note added!. Take a note, the content might appear after a couple of seconds. If you cant see any, just refresh it",
  };
}
