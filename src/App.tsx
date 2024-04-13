import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import { store } from "./store";
import Layout from "./components/Layout";
import TimerContainer from "./components/TimerContainer";
import Todos from "./components/Todos";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed5b3a",
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
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
    MuiFormControlLabel: {
      styleOverrides: {
        label: ({ ownerState }) => ({ textDecoration: ownerState.checked ? "line-through" : "none" }),
      },
    },
  },
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
