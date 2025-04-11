const Text = ({ content }) => {
  return <p> {content} </p>;
};
const XlTitle = ({ content, className }) => {
  return (
    <h1
      className={`font-[family-name:var(--font-title)] font-black uppercase text-4xl tracking-tight text-center ${className}`}
    >
      {content}
    </h1>
  );
};
export { Text, XlTitle };
