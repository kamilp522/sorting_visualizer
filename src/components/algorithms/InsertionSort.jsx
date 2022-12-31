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

    setIsSorting(false);
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
