import { useEffect, useRef, Fragment } from "react";
import RenderRow from "./RenderRow";
import Spinner from "./Spinner";

export default function ResultMatrixDisplay({
  title,
  matrix,
  focusSelector,
  customCss,
  loading,
}) {
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
      <div className={"overlayContainer " + (customCss ? customCss : "")}>
        {loading ? <Spinner /> : null}
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
