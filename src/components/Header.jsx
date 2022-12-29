import { useState } from "react";

import CreateBlocksForm from "./CreateBlocksForm";
import SelectSpeedForm from "./SelectSpeedForm";
import SelectionSort from "./algorithms/SelectionSort";

const Header = ({
  blockNodesHeights,
  setBlockNodesHeights,
  speed,
  setSpeed,
}) => {
  const [isSorting, setIsSorting] = useState(false);

  return (
    <header className="header">
      <h1 className="header__title">Sorting Visualizer</h1>
      <CreateBlocksForm
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
          <SelectSpeedForm setSpeed={setSpeed} />
          <h2 className="header__secondary-title">Choose an algorithm:</h2>
          <ul className="header__list">
            <SelectionSort
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              speed={speed}
            />
            <li className="header__item">
              <button className="button button--header">Bubble</button>
            </li>
            <li className="header__item">
              <button className="button button--header">Insertion</button>
            </li>
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
