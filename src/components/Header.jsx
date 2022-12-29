import { useState } from "react";

import { randomizeArray } from "../helpers/randomizeArray";
import { checkIfNumber } from "../helpers/checkIfNumber";

const Header = ({
  blockNodesHeights,
  setBlockNodesHeights,
  speed,
  setSpeed,
}) => {
  const [isSorting, setIsSorting] = useState(false);

  const resetBlocks = () => {
    setBlockNodesHeights(null);
    setSpeed(null);
  };

  const createBlocksHandler = (event) => {
    event.preventDefault();
    resetBlocks();

    let numberOfElementsInput = document.getElementById("blocks-input");
    const blocksNumber = Number(numberOfElementsInput.value);
    numberOfElementsInput.value = "";

    if (!checkIfNumber(blocksNumber)) {
      console.log("Input has to be a positive number");
      return;
    }

    if (blocksNumber < 5 || blocksNumber > 1000) {
      console.log("Input has to be a number in range between 5 and 1000!");
      return;
    }

    createBlockHeights(blocksNumber);
    const miliseconds = speedSelectToMiliseconds();
    setSpeed(miliseconds);
  };

  const createBlockHeights = (number) => {
    const heights = [];
    for (let i = 1; i <= number; i++) {
      const smallestUnit = 100 / number;
      heights.push(`${smallestUnit * i}%`);
    }

    setBlockNodesHeights(randomizeArray(heights));
  };

  const findMinHeight = (array) => {
    const parsedHeights = parseHeights(array);
    const minHeight = Math.min(...parsedHeights);
    return minHeight;
  };

  const parseHeights = (array) => {
    const parsedHeights = [];
    for (let i = 0; i < array.length; i++) {
      const parsedHeight = +array[i].style.height.replace("%", "");
      parsedHeights.push(parsedHeight);
    }
    return parsedHeights;
  };

  const findMinBlock = (array, height) => {
    let minBlock;
    for (let i = 0; i < array.length; i++) {
      if (array[i].style.height === `${height}%`) {
        minBlock = array[i];
        return minBlock;
      }
    }
  };

  const highlightBlocks = (min, current) => {
    min.classList.add("active");
    current.classList.add("active");
  };

  const toneDownBlocks = (min, current) => {
    min.classList.remove("active");
    current.classList.remove("active");
  };

  const waitFor = (miliseconds) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, miliseconds);
    });
  };

  const swapBlocks = async (array, min, current) => {
    if (min === current) return;
    if (!blockNodesHeights) return;
    const blockContainer = document.getElementById("block-container");

    await waitFor(speed / 3);
    highlightBlocks(min, current);

    await waitFor(speed);
    const minIndex = array.indexOf(min);
    blockContainer.insertBefore(min, current);
    blockContainer.insertBefore(current, array[minIndex + 1]);

    await waitFor(speed / 3);
    toneDownBlocks(min, current);
  };

  const selectionSort = async (event) => {
    if (isSorting) return;
    setIsSorting(true);

    const blocksLength = [...document.querySelectorAll(".block")].length;
    for (let i = 0; i < blocksLength; i++) {
      const blocks = [...document.querySelectorAll(".block")];
      const minBlockHeight = findMinHeight(blocks.slice(i));
      const minBlock = findMinBlock(blocks, minBlockHeight);
      await swapBlocks(blocks, minBlock, blocks[i]);
    }

    setIsSorting(false);
  };

  const parseSpeedInput = (input) => +input.replace("x", "");

  const speedSelectToMiliseconds = () => {
    let speedSelect = document.getElementById("speed-select");
    if (!speedSelect) return 1000;
    const parsedSpeedSelect = parseSpeedInput(speedSelect.value);
    const miliseconds = (1 / parsedSpeedSelect) * 1000;
    return miliseconds;
  };

  const chooseSpeedHandler = (event) => {
    event.preventDefault();
    const miliseconds = speedSelectToMiliseconds();
    setSpeed(miliseconds);
  };

  return (
    <header className="header">
      <h1 className="header__title">Sorting Visualizer</h1>

      <form className="header__form" onSubmit={createBlocksHandler}>
        {!isSorting && (
          <>
            <label className="header__label">number of elements: </label>
            <input className="header__input" id="blocks-input" type="text" />
            <button className="button button--header button--bold">
              confirm
            </button>
          </>
        )}
        <button
          type="button"
          onClick={resetBlocks}
          className="button button--header button--bold"
        >
          reset
        </button>
      </form>

      {!isSorting && blockNodesHeights && (
        <>
          <form>
            <label className="header__label">choose speed:</label>
            <select
              defaultValue="x1"
              id="speed-select"
              className="header__select"
              onChange={chooseSpeedHandler}
            >
              <option value="x0.5">x0.5</option>
              <option value="x1">x1</option>
              <option value="x3">x3</option>
              <option value="x5">x5</option>
              <option value="x10">x10</option>
              <option value="x25">x25</option>
              <option value="x100">x100</option>
              <option value="x1000">x1000</option>
            </select>
          </form>
          <h2 className="header__secondary-title">Choose an algorithm:</h2>
          <ul className="header__list">
            <li className="header__item">
              <button className="button button--header" onClick={selectionSort}>
                Selection
              </button>
            </li>
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
