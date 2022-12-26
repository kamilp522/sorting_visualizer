import { useState, useEffect } from "react";
import "./sass/style.sass";

function App() {
  const [blocks, setBlocks] = useState([]);

  const checkIfNumber = (input) => /^\d+$/.test(input);

  const getElementsNumber = (event) => {
    event.preventDefault();
    let numberOfElementsInput = document.getElementById("blocks-number-input");
    const blocksNumber = numberOfElementsInput.value;
    numberOfElementsInput.value = "";

    if (!checkIfNumber(blocksNumber)) {
      console.log("Input has to be a number!");
      return;
    }

    const blocksHeights = [];
    for (let i = 1; i <= blocksNumber; i++) {
      const smallestUnit = 100 / blocksNumber;
      blocksHeights.push(`${smallestUnit * i}%`);
    }
    console.log(blocksHeights);
    setBlocks(blocksHeights);
  };

  return (
    <>
      <header>
        <h1>Sorting Visualizer</h1>
        <h2>Choose an algorithm:</h2>
        <ul>
          <li>
            <button>Selection</button>
          </li>
          <li>
            <button>Bubble</button>
          </li>
          <li>
            <button>Insertion</button>
          </li>
          <li>
            <button>Merge</button>
          </li>
          <li>
            <button>Quick</button>
          </li>
          <li>
            <button>Heap</button>
          </li>
          <li>
            <button>Radix</button>
          </li>
          <li>
            <button>Bogo</button>
          </li>
        </ul>
        <form onSubmit={getElementsNumber}>
          <label>number of elements: </label>
          <input id="blocks-number-input" type="text" />
          <button>confirm</button>
        </form>
      </header>
      {blocks[0] && (
        <main>
          {blocks.map((block) => (
            <div style={{ height: block }} className="block"></div>
          ))}
        </main>
      )}
    </>
  );
}

export default App;
