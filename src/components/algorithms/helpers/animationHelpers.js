export const highlightBlocks = (element1, element2) => {
  element1.classList.add("active");
  element2.classList.add("active");
};

export const toneDownBlocks = (element1, element2) => {
  element1.classList.remove("active");
  element2.classList.remove("active");
};

export const waitFor = (miliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, miliseconds);
  });
};
