import { parseHeight } from "./helpers/parseHeightsHelpers";
import {
  highlightBlocks,
  toneDownBlocks,
  waitFor,
} from "./helpers/animationHelpers";

const BubbleSort = ({ blockNodesHeights, isSorting, setIsSorting, speed }) => {
  const bubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    for (let i = 0; i < blockNodesHeights.length; i++) {
      for (let j = 0; j < blockNodesHeights.length - 1; j++) {
        const blocks = [...document.querySelectorAll(".main__block")];

        const currentBlockHeight = parseHeight(blocks[j]);
        const nextBlockHeight = parseHeight(blocks[j + 1]);

        if (currentBlockHeight > nextBlockHeight) {
          await swapBlocks(blocks[j], blocks[j + 1]);
        }
      }
    }

    setIsSorting(false);
  };

  const swapBlocks = async (current, next) => {
    const blockContainer = document.getElementById("block-container");

    await waitFor(speed / 3);
    highlightBlocks(current, next);

    await waitFor(speed);
    blockContainer.insertBefore(next, current);

    await waitFor(speed / 3);
    toneDownBlocks(current, next);
  };

  return (
    <li className="header__item">
      <button className="button button--header" onClick={bubbleSort}>
        Bubble
      </button>
    </li>
  );
};

export default BubbleSort;
