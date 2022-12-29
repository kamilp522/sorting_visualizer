export const parseHeights = (array) => {
  const parsedHeights = [];
  for (let i = 0; i < array.length; i++) {
    const parsedHeight = parseHeight(array[i]);
    parsedHeights.push(parsedHeight);
  }
  return parsedHeights;
};

export const parseHeight = (element) => +element.style.height.replace("%", "");
