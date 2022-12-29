import { randomizeArray } from "../helpers/randomizeArray";
import { checkIfNumber } from "../helpers/checkIfNumber";

const CreateBlocksForm = ({
  setBlockNodesHeights,
  speed,
  setSpeed,
  isSorting,
}) => {
  const resetBlocks = () => {
    setBlockNodesHeights(null);
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

    if (blocksNumber < 5 || blocksNumber > 1000) {
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

    setBlockNodesHeights(randomizeArray(heights));
  };

  return (
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
  );
};

export default CreateBlocksForm;
