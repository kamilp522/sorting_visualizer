import { useState } from "react";

import { randomizeArray } from "../helpers/randomizeArray";
import { checkIfNumber } from "../helpers/checkIfNumber";

const Header = ({ blocksHeights, setBlocksHeights }) => {
  const [timeoutId, SetTimeoutId] = useState(null);

  const createElements = (event) => {
    event.preventDefault();

    let numberOfElementsInput = document.getElementById("blocks-input");
    const blocksNumber = Number(numberOfElementsInput.value);
    numberOfElementsInput.value = "";

    if (!checkIfNumber(blocksNumber)) {
      console.log("Input has to be a positive number");
      return;
    }

    if (blocksNumber < 5 || blocksNumber > 100) {
      console.log("Input has to be a number in range between 5 and 100!");
      return;
    }

    const heights = [];
    for (let i = 1; i <= blocksNumber; i++) {
      const smallestUnit = 100 / blocksNumber;
      heights.push(`${smallestUnit * i}%`);
    }

    setBlocksHeights(randomizeArray(heights));
  };

  const swap = (array, index1, index2) => {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  };

  const findMinHeight = (array) => {
    const parsedHeights = parseHeights(array);
    console.log(parsedHeights);
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

  const swapBlocks = (min, current) => {
    const blockContainer = document.getElementById("block-container");
    blockContainer.insertBefore(min, current);
  };

  const selectionSort = () => {
    const blocksLength = [...document.querySelectorAll(".block")].length;

    for (let i = 0; i < blocksLength; i++) {
      const blocks = [...document.querySelectorAll(".block")];
      const minBlockHeight = findMinHeight(blocks.slice(i));
      const minBlock = findMinBlock(blocks, minBlockHeight);
      swapBlocks(minBlock, blocks[i]);
    }

    ////////////////////////////////////////////

    // for (let i = 0; i < blocks.length; i++) {
    //   const min = Math.min(...parsedHeights.slice(i));

    //   let minBlock;
    //   blocks.forEach((block) => {
    //     if (block.style.height === `${min}%`) minBlock = block;
    //   });

    //   const minBlockIndex = blocks.indexOf(minBlock);

    /////////////////////////////////////

    // blocks.forEach((block) => {
    //   if (block.style.height === `${min}%`) minBlock = block;
    // });

    // minBlock.classList.add("active");

    // setTimeout(() => {
    //   minBlock.classList.remove("active");
    // }, 1000);

    //////////////////////////////////////////

    // blocks.forEach((block) => {
    //   const height = block.style.height;
    //   const parsedHeight = +height.replace("%", "");
    //   heightsArray.push(parsedHeight);
    // });

    // for (let i = 0; i < blocks.length; i++) {
    //   const min = Math.min(...heightsArray);
    //   const minBlockIndex = heightsArray.indexOf(min);
    //   const firstBlock = blockContainer.firstChild;

    //   blocks[minBlockIndex].classList.add("active");
    //   firstBlock.classList.add("active");

    //   const myPromise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       blocks[minBlockIndex].classList.remove("active");
    //       firstBlock.classList.remove("active");
    //       resolve();
    //     }, 1000);
    //   });

    //   await myPromise.then(
    //     setTimeout(() => {
    //       blockContainer.insertBefore(blocks[minBlockIndex], firstBlock);
    //     }, 500)
    //   );

    //   heightsArray[minBlockIndex] = Math.max(...heightsArray) + 1;
    // }
  };

  return (
    <header className="header">
      <h1 className="header__title">Sorting Visualizer</h1>
      <form className="header__form" onSubmit={createElements}>
        <label className="header__label">number of elements: </label>
        <input className="header__input" id="blocks-input" type="text" />
        <button className="button button--header button--header-confirm">
          confirm
        </button>
        <button
          type="button"
          className="button button--header button--header-confirm"
        >
          randomize
        </button>
      </form>

      {blocksHeights && (
        <>
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
