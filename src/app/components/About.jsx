import { XlTitle } from "./Text";

const About = () => {
  return (
    <section className="grid grid-cols-3 gap-8 md:h-screen bg-orange-200 w-full">
      <div className="h-full bg-red-400 "></div>
      <div className="vr col-span-2 grid gap-1 max-w-[500px] ">
        <XlTitle content={"About me"} className={"md:text-6xl md:text-start"} />
        <p>
          Hi, I’m <strong>Ibtihel Ben Salah</strong> — an artist, illustrator,
          and visual storyteller based in Hammam Lif, Tunisia. My work blends
          vibrant color, cultural memory, and a touch of playfulness. I paint
          what speaks to me: Tunisian architecture, food, nature, and still
          moments that often go unnoticed.
        </p>
        <hr />
        <p>
          I work mainly with watercolor, gouache, acrylic, and colored pencils
          from a local brand I love. My style mixes bold palettes with soft
          details, and lately, I’ve been exploring ways to merge traditional
          subjects with unexpected, modern twists — like graffiti words hidden
          in architectural pieces.
        </p>
        <hr />
        <p>
          After reconnecting with art six years ago, I’ve been steadily building
          a body of work that feels honest and rooted. In 2024, one of my
          paintings was selected and purchased by the state of St. Croix during{" "}
          <em>Prelude Créatif</em> — a moment that affirmed my path as an
          exhibiting artist.
        </p>
        <hr />
        <p>
          Through my art, I aim to create pieces that feel personal yet familiar
          — whether it’s for collectors, brands, or anyone drawn to stories told
          through color and form.
        </p>
      </div>
    </section>
  );
};

export default About;
