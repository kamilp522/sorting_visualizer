import { useState, useEffect } from "react";

import Header from "./components/Header";

import "./sass/style.sass";

function App() {
  const [blocksHeights, setBlocksHeights] = useState([]);

  return (
    <>
      <Header
        blocksHeights={blocksHeights}
        setBlocksHeights={setBlocksHeights}
      />
      {blocksHeights[0] && (
        <main>
          {blocksHeights.map((blockHeight, index) => (
            <div
              key={index}
              style={{ height: blockHeight }}
              className="block"
            ></div>
          ))}
        </main>
      )}
    </>
  );
}

export default App;
