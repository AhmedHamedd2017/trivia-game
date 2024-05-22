import BaseButton from "../components/buttons/BaseButton";
import GridContainer from "../components/containers/GridContainer";
import { H1Elem } from "../shared/styledComponents";
// import KeyboardInstructions from "../components/shared/KeyboardInstructions";
// import { Instruction } from "../models/interfaces";

const categories = {
  trivia_categories: [
    {
      id: 9,
      name: "General Knowledge",
    },
    {
      id: 10,
      name: "Entertainment: Books",
    },
    {
      id: 11,
      name: "Entertainment: Film",
    },
    {
      id: 12,
      name: "Entertainment: Music",
    },
    {
      id: 13,
      name: "Entertainment: Musicals & Theatres",
    },
    {
      id: 14,
      name: "Entertainment: Television",
    },
    {
      id: 15,
      name: "Entertainment: Video Games",
    },
    {
      id: 16,
      name: "Entertainment: Board Games",
    },
    {
      id: 17,
      name: "Science & Nature",
    },
    {
      id: 18,
      name: "Science: Computers",
    },
    {
      id: 19,
      name: "Science: Mathematics",
    },
    {
      id: 20,
      name: "Mythology",
    },
    {
      id: 21,
      name: "Sports",
    },
    {
      id: 22,
      name: "Geography",
    },
    {
      id: 23,
      name: "History",
    },
    {
      id: 24,
      name: "Politics",
    },
    {
      id: 25,
      name: "Art",
    },
    {
      id: 26,
      name: "Celebrities",
    },
    {
      id: 27,
      name: "Animals",
    },
    {
      id: 28,
      name: "Vehicles",
    },
    {
      id: 29,
      name: "Entertainment: Comics",
    },
    {
      id: 30,
      name: "Science: Gadgets",
    },
    {
      id: 31,
      name: "Entertainment: Japanese Anime & Manga",
    },
    {
      id: 32,
      name: "Entertainment: Cartoon & Animations",
    },
  ],
};

// const instructions: Instruction[] = [
//   {
//     buttons: ["E"],
//     description: "asy",
//   },
//   {
//     buttons: ["M"],
//     description: "edium",
//   },
//   {
//     buttons: ["H"],
//     description: "ard",
//   },
//   {
//     buttons: ["P"],
//     description: "lay",
//   },
// ];

const Categories = () => {
  const renderCategories = () => {
    return categories.trivia_categories.map((category) => {
      return <BaseButton text={category.name} key={category.id} />;
    });
  };

  return (
    <>
      <H1Elem>Questions Category</H1Elem>
      <GridContainer isColumn={true} repeat={3}>
        {renderCategories()}
      </GridContainer>
      <BaseButton text="Start" />
      {/* <KeyboardInstructions instructions={instructions} /> */}
    </>
  );
};

export default Categories;
