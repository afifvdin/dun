import Image from "next/image";
import Link from "next/link";

export const NoteCard = ({ _id, title, contentPreview, coverImage }) => {
  if (!coverImage) {
    return (
      <Link href={`/notes/${_id}`}>
        <div
          style={{
            "--degree": `${Math.random() * 20 - 10}deg`,
          }}
          className="text-neutral-700 rotate-(--degree) top-0 hover:-top-1 hover:shadow-xl w-full h-64 rounded-3xl bg-white shadow transition-all border-8 relative overflow-hidden p-4 cursor-pointer"
        >
          <div className="left-0 top-0 absolute z-1 w-full h-full flex flex-col justify-end p-4 bg-gradient-to-b from-transparent from-50% via-75% via-white/50 to-white to-100%">
            <p className="text-xl font-bold tracking-tighter">{title}</p>
          </div>
          <p className="tracking-tight leading-loose">{contentPreview}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/notes/${_id}`}>
      <div
        style={{
          "--degree": `${Math.random() * 20 - 10}deg`,
        }}
        className="rotate-(--degree) top-0 hover:-top-1 hover:shadow-xl w-full h-64 rounded-3xl bg-white shadow transition-all border-8 relative overflow-hidden p-4 cursor-pointer"
      >
        <div className="left-0 top-0 absolute z-1 w-full h-full flex flex-col justify-end text-white p-4 bg-gradient-to-b from-transparent from-0% via-80% via-transparent to-black to-100%">
          <p className="text-xl font-bold tracking-tighter">{title}</p>
        </div>
        <Image
          src={coverImage}
          fill
          alt="pic"
          className="h-full w-full bg-cover object-cover"
        />
      </div>
    </Link>
  );
};
