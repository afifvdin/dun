import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const NotFound = () => {
  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-8 text-neutral-700 space-y-64">
      <Link
        href="/notes"
        className="flex items-center gap-2 tracking-tight text-neutral-500"
      >
        <ArrowLeftIcon className="size-3.5" />
        <span>Back to notes</span>
      </Link>
      <p className="text-center text-neutral-300 text-5xl font-medium tracking-tighter">
        Note Not Found
      </p>
    </main>
  );
};
