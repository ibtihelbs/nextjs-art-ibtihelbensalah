import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen md:py-8  gap-8  font-[family-name:var(--font-text)] ">
      <Hero />
      <hr className="w-full border-t border-black border-4 rounded-full my-4" />
      <About />
      <hr className="w-full border-t border-black border-4 rounded-full my-4" />
      <Contact />
    </div>
  );
}
