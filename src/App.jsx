import { useState } from "react";
import ErrorFallback from "./components/ErrorFallback";
import ResultMatrixDisplay from "./components/ResultMatrixDisplay";
import decoderUtil from "./utils/decoderUtil";
import "./App.css";

function App() {
  const [decodedMap, setDecodedMap] = useState();
  const [highestSoulCount, setHighestSoulCount] = useState();
  const [error, setError] = useState(null);

  function fileUpload(event) {
    const file = event.target.files[0];
    //TODO check if the scroll is valid
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const result = event.target.result;
        if (decoderUtil.mapIsValid(result)) {
          let squareMatrixLength = Math.sqrt(result.length);
          // check if map does not have a missing peace
          if (squareMatrixLength % 1 === 0) {
            const decodedScroll = decoderUtil.decodeScroll(result);

            const spiralMap = decoderUtil.formSpiralMatrix(
              decodedScroll.reverse(),
              decoderUtil.createSquareMatrix(squareMatrixLength)
            );

            const [soulCount, matrixMap] =
              decoderUtil.getMPopulatedWithMap(spiralMap);

            setDecodedMap(matrixMap);
            setHighestSoulCount(soulCount);
          } else {
            setError({
              message:
                "Your map has a missing peace, make sure to bring the whole map!",
              resetErrorBoundary: () => {
                setError(null);
                setDecodedMap(null);
                setHighestSoulCount(null);
              },
            });
          }
        } else {
          setError({
            message:
              "Your map is a counterfeit, the search for the original map continues :(",
            resetErrorBoundary: () => {
              setError(null);
              setDecodedMap(null);
              setHighestSoulCount(null);
            },
          });
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Artificial Lost Island Scroll decoder</h1>
      </div>
      {error ? (
        <ErrorFallback {...error} />
      ) : (
        <>
          <div className="container mx-auto px-4">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-1 file:border-solid
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                onChange={fileUpload}
              />
            </label>
          </div>
          <div className="result">
            {decodedMap ? (
              <ResultMatrixDisplay
                matrix={decodedMap}
                title={highestSoulCount}
                focusSelector={'span[style="color: green;"]'}
                customCss={"overflow-x-auto overflow-y-auto max-h-96"}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
