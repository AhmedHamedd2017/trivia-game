import styled from "styled-components";
import "./App.css";

import GameLayout from "./layouts/GameLayout";
import { QueryClient, QueryClientProvider } from "react-query";

const MainElem = styled.main`
  height: 100vh;
  width: 100%;
  background: var(--background-gradient);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainElem>
        <GameLayout />
      </MainElem>
    </QueryClientProvider>
  );
}

export default App;
