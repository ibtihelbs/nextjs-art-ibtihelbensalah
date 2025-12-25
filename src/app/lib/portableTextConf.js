export const portableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mb-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-neutral-700 mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic text-neutral-600 my-6">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-neutral-800">{children}</em>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 decoration-2 hover:decoration-4 transition"
      >
        {children}
      </a>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="text-neutral-700">{children}</li>,
  },

  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <img
          src={urlFor(value).width(1200).url()}
          alt={value?.alt || ""}
          className="rounded-xl"
        />
        {value?.caption && (
          <figcaption className="mt-3 text-sm text-neutral-500 text-center">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};
