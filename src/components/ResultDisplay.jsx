import { useEffect, useRef, Fragment } from "react";
import RenderRow from "./RenderRow";

export default function ResultDisplay({ highestSoulCount, matrix }) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      let island = document.querySelector('span[style="color: green;"]');
      island?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
    didMountRef.current = true;
  }, [matrix]);

  return (
    <>
      <h1>{highestSoulCount}</h1>
      <div className="overflow-x-auto overflow-y-auto max-h-96">
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
