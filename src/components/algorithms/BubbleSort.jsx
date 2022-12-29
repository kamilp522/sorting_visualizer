const BubbleSort = ({ blockNodesHeights, isSorting, setIsSorting, speed }) => {
  const bubbleSort = () => {
    if (isSorting) return;
    setIsSorting(true);

    setIsSorting(false);
  };

  return (
    <li className="header__item">
      <button className="button button--header">Bubble</button>
    </li>
  );
};

export default BubbleSort;
