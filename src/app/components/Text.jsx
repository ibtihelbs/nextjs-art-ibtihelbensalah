const XlTitle = ({ content, className }) => {
  return (
    <h1
      className={`font-[family-name:var(--font-title)] font-black uppercase md:text-4xl text-2xl tracking-tight text-center ${className}`}
    >
      {content}
    </h1>
  );
};

const XlTitleName = ({ content, className }) => {
  return (
    <h3
      className={`font-[family-name:var(--font-title)] font-black uppercase md:text-4xl text-2xl tracking-tight text-center ${className}`}
    >
      {content}
    </h3>
  );
};
const Title = ({ content, className }) => {
  return (
    <h2
      className={`font-[family-name:var(--font-title)] font-black uppercase md:text-2xl text-2xl  tracking-tight text-center ${className}`}
    >
      {content}
    </h2>
  );
};
export { XlTitle, Title, XlTitleName };
