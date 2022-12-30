import { parseHeights } from "./helpers/parseHeightsHelpers";
import {
  highlightBlocks,
  toneDownBlocks,
  waitFor,
} from "./helpers/animationHelpers";
import { indexOf } from "lodash";

const SelectionSort = ({
  blockNodesHeights,
  isSorting,
  setIsSorting,
  speed,
}) => {
  const selectionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    for (let i = 0; i < blockNodesHeights.length; i++) {
      const blocks = [...document.querySelectorAll(".main__block")];
      const minBlockHeight = await findMinHeight(blocks.slice(i));
      const minBlock = findMinBlock(blocks, minBlockHeight);
      await swapBlocks(blocks, minBlock, blocks[i]);
    }

    setIsSorting(false);
  };

  const findMinHeight = async (array) => {
    const parsedHeights = parseHeights(array);
    let minHeight = parsedHeights[0];
    let currentMinBlock = array[0];

    highlightBlocks(array[0]);

    for (let i = 1; i < parsedHeights.length; i++) {
      await waitFor(speed / 3);
      highlightBlocks(array[i]);

      if (minHeight > parsedHeights[i]) {
        await waitFor(speed / 3);
        toneDownBlocks[currentMinBlock];

        minHeight = parsedHeights[i];
        currentMinBlock = array[i];
      } else {
        await waitFor(speed / 3);
        toneDownBlocks(array[i]);
      }
    }

    return minHeight;
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

  const swapBlocks = async (array, min, current) => {
    // if (min === current) return;
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

  return (
    <li className="header__item">
      <button className="button button--header" onClick={selectionSort}>
        Selection
      </button>
    </li>
  );
};

export default SelectionSort;
