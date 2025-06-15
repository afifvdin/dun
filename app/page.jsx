"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "./action";
import { useActionState } from "react";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  const [_, action, pending] = useActionState(loginAction, null);

  return (
    <main className="h-screen flex justify-center items-center">
      <form className="flex items-center gap-2" action={action}>
        <Input name="username" placeholder="How should we call you?" />
        <Button
          disabled={pending}
          size="icon"
          className="w-auto h-auto p-2"
          type="submit"
        >
          <ArrowRightIcon className="size-4" />
        </Button>
      </form>
    </main>
  );
}
