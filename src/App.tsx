import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import { store } from "./store";
import Layout from "./components/Layout";
import TimerContainer from "./components/TimerContainer";
import Todos from "./components/Todos";
import runOneSignal from "./utils/signal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed5b3a",
    },
    secondary: {
      main: "#5c497c",
    },
    action: {
      disabled: "#ffffff8d",
      disabledBackground: "#00000095",
      disabledOpacity: 0.5,
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
          width: "100px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-checked": {
            color: "white",
          },
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    runOneSignal();
  }, []);
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
