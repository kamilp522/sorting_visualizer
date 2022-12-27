import { randomizeArray } from "../helpers/randomizeArray";
import { checkIfNumber } from "../helpers/checkIfNumber";

const Header = ({ blocksHeights, setBlocksHeights }) => {
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

  const selectionSort = () => {
    const blocks = [...document.querySelectorAll(".block")];
    const blockContainer = document.getElementById("block-container");
    const heightsArray = [];

    blocks.forEach((block) => {
      const height = block.style.height;
      const parsedHeight = +Number(height.replace("%", "")).toFixed(2);

      heightsArray.push(parsedHeight);
    });

    const min = Math.min(...heightsArray);
    const minBlockIndex = heightsArray.indexOf(min);

    blockContainer.insertBefore(blocks[minBlockIndex], blocks[0]);
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
