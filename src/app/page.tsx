import Link from "next/link";
import Form from "@/app/components/Form";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-black uppercase text-4xl md:w-1/3 text-center">
        Website is still under construction
      </h1>
      <p className="max-w-2xl">
        Meanwhile, you can download free wallpaper / 2025 calendar.
      </p>
      <Link
        className="bg-yellow-300 hover:bg-yellow-200 font-bold px-2 py-1 rounded-full"
        href="/shop"
      >
        Shop
      </Link>
      <p className="text-center">
        Feel free to contact me <br />
        <a
          href="mailto:ibtihel.bensalah@outlook.fr"
          className="text-xl font-bold bg-blue-700 text-white px-2 rounded"
        >
          By email: click here!
        </a>
      </p>
      <Form />
    </div>
  );
}
