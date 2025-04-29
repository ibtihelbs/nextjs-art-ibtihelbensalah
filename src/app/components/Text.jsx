
const XlTitle = ({ content, className }) => {
  return (
    <h1
      className={`font-[family-name:var(--font-title)] font-black uppercase md:text-4xl text-2xl tracking-tight text-center ${className}`}
    >
      {content}
    </h1>
  );
};
const Title = ({ content, className }) => {
  return (
    <h1
      className={`font-[family-name:var(--font-title)] font-black uppercase md:text-2xl text-xl underline tracking-tight text-center ${className}`}
    >
      {content}
    </h1>
  );
};
export {  XlTitle, Title };
