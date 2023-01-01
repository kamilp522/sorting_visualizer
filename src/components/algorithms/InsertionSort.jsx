import { parseHeight } from "./helpers/parseHeightsHelpers";
import {
  highlightBlocks,
  toneDownBlocks,
  waitFor,
} from "./helpers/animationHelpers";

const InsertionSort = ({
  setCurrentSort,
  blockNodesHeights,
  isSorting,
  setIsSorting,
  speed,
}) => {
  const insertionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setCurrentSort("insertion");

    for (let i = 1; i < blockNodesHeights.length; i++) {
      const blocksAtStart = [...document.querySelectorAll(".main__block")];

      await waitFor(speed / 3);
      highlightBlocks(blocksAtStart[i]);

      for (let j = i; j > 0; j--) {
        const blocks = [...document.querySelectorAll(".main__block")];
        if (!blocks.length) {
          setCurrentSort("");
          setIsSorting(false);
          return;
        }

        const previousBlockHeight = parseHeight(blocks[j - 1]);
        const currentBlockHeight = parseHeight(blocks[j]);

        await waitFor(speed / 3);
        highlightBlocks(blocks[j - 1], blocks[j]);

        if (previousBlockHeight > currentBlockHeight) {
          await waitFor(speed);
          swapBlocks(blocks[j], blocks[j - 1]);
        }

        if (previousBlockHeight < currentBlockHeight) {
          await waitFor(speed / 3);
          toneDownBlocks(blocks[j - 1], blocks[j]);
          break;
        }

        await waitFor(speed / 3);
        toneDownBlocks(blocks[j - 1], blocks[j]);
      }
      await waitFor(speed / 3);
      toneDownBlocks(blocksAtStart[i]);
    }

    setCurrentSort("");
    setIsSorting(false);
  };

  const swapBlocks = (current, previous) => {
    const blockContainer = document.getElementById("block-container");
    if (!blockContainer) return;

    blockContainer.insertBefore(current, previous);
  };

  return (
    <li className="header__item">
      <button className="button button--header" onClick={insertionSort}>
        Insertion
      </button>
    </li>
  );
};

export default InsertionSort;
