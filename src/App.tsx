import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatInterface, SharedConversation } from "./components";

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<ChatInterface />} />
      <Route path="/share/:id" element={<SharedConversation />} />
    </Routes>
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
