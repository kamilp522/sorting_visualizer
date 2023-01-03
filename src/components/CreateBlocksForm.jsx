import { randomizeArray } from "../helpers/randomizeArray";
import { checkIfNumber } from "../helpers/checkIfNumber";

import { useSelector, useDispatch } from "react-redux";
import {
  setBlockNodesHeights,
  removeBlockNodesHeights,
} from "../reducers/blockNodesHeightsReducer";

const CreateBlocksForm = ({ speed, setSpeed, isSorting }) => {
  const blockNodesHeights = useSelector((store) => store.heights);
  const dispatch = useDispatch();

  const resetBlocks = () => {
    dispatch(removeBlockNodesHeights());
    setSpeed(speed);
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

    if (blocksNumber < 5 || blocksNumber > 100) {
      console.log("Input has to be a number in range between 5 and 1000!");
      return;
    }

    createBlockHeights(blocksNumber);
    setSpeed(speed);
  };

  const createBlockHeights = (number) => {
    const heights = [];
    for (let i = 1; i <= number; i++) {
      const smallestUnit = 100 / number;
      heights.push(`${smallestUnit * i}%`);
    }
    dispatch(setBlockNodesHeights(randomizeArray(heights)));
  };

  const randomizeBlocks = () => {
    if (!blockNodesHeights) return;
    createBlockHeights(blockNodesHeights.length);
  };

  return (
    <form className="header__form" onSubmit={createBlocksHandler}>
      {!isSorting && (
        <>
          <label className="header__label">enter elements (5 to 100): </label>
          <input className="header__input" id="blocks-input" type="text" />
          <button type="submit" className="button button--header button--bold">
            confirm
          </button>
          <button
            type="button"
            onClick={randomizeBlocks}
            className="button button--header button--bold"
          >
            randomize
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
  );
};

export default CreateBlocksForm;
