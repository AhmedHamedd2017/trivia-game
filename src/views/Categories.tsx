import { FC, useState } from "react";
import BaseButton from "../components/buttons/BaseButton";
import GridContainer from "../components/containers/GridContainer";
import { Category } from "../shared/interfaces";
import { H1Elem } from "../shared/styledComponents";
// import KeyboardInstructions from "../components/shared/KeyboardInstructions";
// import { Instruction } from "../models/interfaces";

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

interface Props {
  categories: {
    trivia_categories: Category[];
  };
}

const Categories: FC<Props> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const renderCategories = () => {
    return categories.trivia_categories.map((category) => {
      return (
        <BaseButton
          text={category.name}
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          isSelected={category.id === selectedCategory}
        />
      );
    });
  };

  return (
    <>
      <H1Elem>Questions Category</H1Elem>
      <GridContainer isColumn={true} repeat={3}>
        {renderCategories()}
      </GridContainer>
      <BaseButton text="Start" disabled={!selectedCategory} />
      {/* <KeyboardInstructions instructions={instructions} /> */}
    </>
  );
};

export default Categories;
