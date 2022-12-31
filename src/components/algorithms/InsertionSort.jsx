import { parseHeight } from "./helpers/parseHeightsHelpers";
import {
  highlightBlocks,
  toneDownBlocks,
  waitFor,
} from "./helpers/animationHelpers";

const InsertionSort = ({
  blockNodesHeights,
  isSorting,
  setIsSorting,
  speed,
}) => {
  const insertionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    for (let i = 1; i < blockNodesHeights.length - 1; i++) {
      let blocks = [...document.querySelectorAll(".main__block")];

      const previousBlockHeight = parseHeight(blocks[i - 1]);
      const currentBlockHeight = parseHeight(blocks[i]);

      for (let j = i; j > 0 && previousBlockHeight > currentBlockHeight; j--) {
        swapBlocks(blocks[j], blocks[j - 1]);
      }
    }

    setIsSorting(false);
  };

  const swapBlocks = (current, previous) => {
    const blockContainer = document.getElementById("block-container");
    if (!blockContainer) return;

    console.log("dziala");

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
