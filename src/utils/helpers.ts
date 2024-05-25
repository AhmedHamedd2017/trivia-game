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

export const saveLocalStorageItem = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export const decodeHtmlText = (htmlText: string) => {
  const divContainer = document.createElement("div");
  divContainer.innerHTML = htmlText;
  return divContainer.textContent || divContainer.innerText || "";
};

export const getFormattedCountdown = (time: number) => {
  return `${`${Math.floor(time / 60)}`.padStart(2, "0")}:${`${
    time % 60
  }`.padStart(2, "0")}`;
};

export const getErrorQuestionsResponse = (response_code: number) => {
  switch (response_code) {
    case 1:
      throw new Error("No Results");
    case 2:
      throw new Error("Invalid Parameter");
    case 3:
      throw new Error("Token Not Found");
    case 4:
      throw new Error("Token Empty");
    case 5:
      throw new Error("Too Many Requests");
  }
};
