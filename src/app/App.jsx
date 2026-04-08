import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from 'react-redux';
import { store } from './store';
import theme from "./theme";
import { AppProvider } from "./context/AppContext";
import router from "./routes/Router";

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AppProvider>
    </Provider>
  );
}

export default App;