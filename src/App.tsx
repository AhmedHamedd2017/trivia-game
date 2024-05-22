import styled from "styled-components";
import "./App.css";

import GameLayout from "./layouts/GameLayout";

const MainElem = styled.main`
  height: 100vh;
  width: 100%;
  background: var(--background-gradient);

  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <MainElem>
      <GameLayout />
    </MainElem>
  );
}

export default App;
