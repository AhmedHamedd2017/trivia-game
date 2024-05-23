// Array Shuffling usijng Fisher–Yates (aka Knuth) Shuffle Algorithm
export const shuffle = (array: string[]): string[] => {
  const arrayCopy = [...array];
  let currentIndex = arrayCopy.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ];
  }

  return arrayCopy;
};

export const decodeHtmlText = (htmlText: string) => {
  const divContainer = document.createElement("div");
  divContainer.innerHTML = htmlText;
  return divContainer.textContent || divContainer.innerText || "";
};
