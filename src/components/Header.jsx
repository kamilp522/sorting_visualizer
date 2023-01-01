import { useState } from "react";

import CreateBlocksForm from "./CreateBlocksForm";
import SelectSpeedForm from "./SelectSpeedForm";
import SelectionSort from "./algorithms/SelectionSort";
import BubbleSort from "./algorithms/BubbleSort";
import InsertionSort from "./algorithms/InsertionSort";

const Header = ({ blockNodesHeights, setBlockNodesHeights }) => {
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [currentSort, setCurrentSort] = useState("");

  return (
    <header className="header">
      <h1 className="header__title">Sorting Visualizer</h1>
      {currentSort && (
        <h3 className="header__tetriary-title">Current: {currentSort} sort</h3>
      )}

      <CreateBlocksForm
        blockNodesHeights={blockNodesHeights}
        setBlockNodesHeights={setBlockNodesHeights}
        speed={speed}
        setSpeed={setSpeed}
        isSorting={isSorting}
      />

      {!isSorting && blockNodesHeights && (
        <>
          <p className="header__paragraph">
            elements:
            <span className="header__span">{blockNodesHeights.length}</span>
          </p>
          <SelectSpeedForm speed={speed} setSpeed={setSpeed} />
          <h2 className="header__secondary-title">Choose an algorithm:</h2>
          <ul className="header__list">
            <SelectionSort
              setCurrentSort={setCurrentSort}
              blockNodesHeights={blockNodesHeights}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              speed={speed}
            />
            <BubbleSort
              setCurrentSort={setCurrentSort}
              blockNodesHeights={blockNodesHeights}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              speed={speed}
            />

            <InsertionSort
              setCurrentSort={setCurrentSort}
              blockNodesHeights={blockNodesHeights}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              speed={speed}
            />
            <li className="header__item">
              <button className="button button--header">Merge</button>
            </li>
            <li className="header__item">
              <button className="button button--header">Quick</button>
            </li>
            <li className="header__item">
              <button className="button button--header">Heap</button>
            </li>
            <li className="header__item">
              <button className="button button--header">Radix</button>
            </li>
            <li className="header__item">
              <button className="button button--header">Bogo</button>
            </li>
          </ul>
        </>
      )}
    </header>
  );
};

export default Header;
