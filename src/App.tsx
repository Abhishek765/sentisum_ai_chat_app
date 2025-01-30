import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatInterface, SharedConversation } from "./components";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Brightness7 } from "@mui/icons-material";
import { toggleTheme } from "./store/themeSlice";

function AppContent() {
  const dispatch = useDispatch();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            SentiSum Ai Chat Interface
          </Typography>
          <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
            <Brightness7 />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<ChatInterface />} />
        <Route path="/share/:id" element={<SharedConversation />} />
      </Routes>
    </>
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
