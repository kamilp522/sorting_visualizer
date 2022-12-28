import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import Header from "./components/Header";

import "./sass/style.sass";

function App() {
  const [blockNodesHeights, setBlockNodesHeights] = useState(null);
  const [blocks, setBlocks] = useState(null);

  // const removeBlocks = () => {
  //   const blockContainer = document.getElementById("block-container");
  //   if (blockContainer) blockContainer.innerHTML = "";
  // };

  const createBlocks = () => {
    const Blocks = () => {
      return (
        <main id="block-container">
          {blockNodesHeights.map((blockHeight) => (
            <div style={{ height: blockHeight }} className="block"></div>
          ))}
        </main>
      );
    };

    setBlocks(Blocks);
  };

  useEffect(() => {
    blockNodesHeights && createBlocks();
  }, [blockNodesHeights]);

  return (
    <>
      <Header
        blockNodesHeights={blockNodesHeights}
        setBlockNodesHeights={setBlockNodesHeights}
      />
      {blockNodesHeights && blocks}
    </>
  );
}

export default App;
