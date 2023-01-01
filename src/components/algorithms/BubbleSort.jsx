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

    for (let i = 1; i < blockNodesHeights.length + 1; i++) {
      let swaps = 0;
      for (let j = 0; j < blockNodesHeights.length - i; j++) {
        const blocks = [...document.querySelectorAll(".main__block")];
        if (!blocks.length) {
          setIsSorting(false);
          return;
        }

        const currentBlockHeight = parseHeight(blocks[j]);
        const nextBlockHeight = parseHeight(blocks[j + 1]);

        await waitFor(speed / 3);
        highlightBlocks(blocks[j], blocks[j + 1]);

        if (currentBlockHeight > nextBlockHeight) {
          swaps++;
          await swapBlocks(blocks[j], blocks[j + 1]);
        }

        await waitFor(speed / 3);
        toneDownBlocks(blocks[j], blocks[j + 1]);
      }
      if (!swaps) {
        setIsSorting(false);
        return;
      }
    }

    setIsSorting(false);
  };

  const swapBlocks = async (current, next) => {
    const blockContainer = document.getElementById("block-container");
    if (!blockContainer) return;

    await waitFor(speed);
    blockContainer.insertBefore(next, current);
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
