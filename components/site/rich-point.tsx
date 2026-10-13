// Renders "Label: text" with the label in bold; plain text otherwise.
export default function RichPoint({ text }: { text: string }) {
  const i = text.indexOf(": ");
  if (i > 0 && i < 60) {
    return (
      <>
        <b className="font-semibold">{text.slice(0, i)}:</b> {text.slice(i + 2)}
      </>
    );
  }
  return <>{text}</>;
}
