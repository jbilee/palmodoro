import { Provider } from "react-redux";
import styled from "styled-components";
import { store } from "./store";
import Layout from "./components/Layout";
import TimerContainer from "./components/TimerContainer";
import Todos from "./components/Todos";
import { ThemeProvider, createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#38225f",
    },
    action: {
      // hover: purple[600],
      hoverOpacity: 0.2,
    }
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem"
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem"
        }
      }
    }
  }
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Wrapper>
            <TimerContainer />
            <Todos />
          </Wrapper>
        </Layout>
      </ThemeProvider>
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
