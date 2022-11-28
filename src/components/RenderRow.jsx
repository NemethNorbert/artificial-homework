export default function RenderRow({ row }) {
  return (
    <>
      {row?.map((elem, key) => {
        return <span key={key} {...elem}></span>;
      })}
    </>
  );
}
