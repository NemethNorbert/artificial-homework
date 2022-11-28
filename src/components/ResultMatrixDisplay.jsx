import { useEffect, useRef, Fragment } from "react";
import RenderRow from "./RenderRow";

export default function ResultMatrixDisplay({ title, matrix, focusSelector, customCss }) {
  const didMountRef = useRef(false);

  if (focusSelector) {
    useEffect(() => {
      if (didMountRef.current) {
        let target = document.querySelector(focusSelector);
        target?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
      }
      didMountRef.current = true;
    }, [matrix]);
  }

  return (
    <>
      <h1>{title}</h1>
      <div className={customCss? customCss : ""}>
        {matrix?.map((row, key) => {
          return (
            <Fragment key={key}>
              <RenderRow row={row} />
              <br />
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
