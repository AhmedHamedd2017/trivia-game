import styled from "styled-components";
import "./App.css";
// import WelcomeScreen from "./views/WelcomeScreen";
import Categories from "./views/Categories";

const MainElem = styled.main`
  height: 100vh;
  width: 100%;
  background: var(--background-gradient);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivElem = styled.div`
  background: var(--brand-blue);
  height: 85%;
  width: 85%;
  border-radius: 45px;

  display: flex;
  flex-direction: column;
  justify-content: safe center;
  align-items: safe center;
  gap: 75px;

  overflow: auto;
  padding: 25px 50px;

  position: relative;

  ::placeholder {
    color: white;
    opacity: 0.8;
  }
`;

function App() {
  return (
    <MainElem>
      <DivElem>
        {/* <WelcomeScreen /> */}
        <Categories />
      </DivElem>
    </MainElem>
  );
}

export default App;
