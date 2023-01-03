import { useState, useEffect } from "react";

import Header from "./components/Header";

import { useSelector } from "react-redux";

import "./sass/style.sass";

function App() {
  const blockNodesHeights = useSelector((store) => store.heights);
  const [blocks, setBlocks] = useState(null);

  const createBlocks = () => {
    const Blocks = () => {
      return (
        <main id="block-container" className="main">
          {blockNodesHeights.map((blockHeight, index) => (
            <div
              key={index}
              style={{ height: blockHeight }}
              className="main__block"
            ></div>
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
      <Header />
      {blockNodesHeights && blocks}
    </>
  );
}

export default App;
