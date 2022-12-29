const SelectionSort = ({
  blockNodesHeights,
  isSorting,
  setIsSorting,
  speed,
}) => {
  const selectionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const blocksLength = [...document.querySelectorAll(".main__block")].length;
    for (let i = 0; i < blocksLength; i++) {
      const blocks = [...document.querySelectorAll(".main__block")];
      const minBlockHeight = findMinHeight(blocks.slice(i));
      const minBlock = findMinBlock(blocks, minBlockHeight);
      await swapBlocks(blocks, minBlock, blocks[i]);
    }

    setIsSorting(false);
  };

  const findMinHeight = (array) => {
    const parsedHeights = parseHeights(array);
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

  const swapBlocks = async (array, min, current) => {
    if (min === current) return;
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

  const highlightBlocks = (min, current) => {
    min.classList.add("active");
    current.classList.add("active");
  };

  const toneDownBlocks = (min, current) => {
    min.classList.remove("active");
    current.classList.remove("active");
  };

  const waitFor = (miliseconds) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, miliseconds);
    });
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
