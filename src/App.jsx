import { useState, useEffect } from "react";

import Header from "./components/Header";

import "./sass/style.sass";

function App() {
  const [blocksHeights, setBlocksHeights] = useState(null);

  return (
    <>
      <Header
        blocksHeights={blocksHeights}
        setBlocksHeights={setBlocksHeights}
      />
      {blocksHeights && (
        <main id="block-container">
          {blocksHeights.map((blockHeight, index) => (
            <div
              key={index}
              style={{ height: blockHeight }}
              className="block"
              id={`block-${index}`}
            ></div>
          ))}
        </main>
      )}
    </>
  );
}

export default App;
