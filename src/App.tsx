import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatInterface, SharedConversation } from "./components";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { toggleTheme } from "./store/themeSlice";
import { darkTheme, lightTheme } from "./styles/theme";

function AppContent() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            SentiSum Ai Chat Interface
          </Typography>
          <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<ChatInterface />} />
        <Route path="/share/:id" element={<SharedConversation />} />
      </Routes>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
