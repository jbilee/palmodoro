import { Provider } from "react-redux";
import styled from "styled-components";
import { store } from "./store";
import Layout from "./components/Layout";
import TimerContainer from "./components/TimerContainer";
import Todos from "./components/Todos";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Wrapper>
          <TimerContainer />
          <Todos />
        </Wrapper>
      </Layout>
    </Provider>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

export default App;
