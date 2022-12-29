import { useState, useEffect } from "react";

import Header from "./components/Header";

import "./sass/style.sass";

function App() {
  const [blockNodesHeights, setBlockNodesHeights] = useState(null);
  const [blocks, setBlocks] = useState(null);

  const createBlocks = () => {
    const Blocks = () => {
      return (
        <main id="block-container" className="main">
          {blockNodesHeights.map((blockHeight) => (
            <div style={{ height: blockHeight }} className="main__block"></div>
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
