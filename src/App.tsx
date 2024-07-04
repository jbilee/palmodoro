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
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgba(31, 13, 25, 0.7);
  @media (min-width: 750px) {
    padding: 4rem;
    border-radius: 3rem;
  }
  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

export default App;
