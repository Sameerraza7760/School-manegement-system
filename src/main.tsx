import ReactDOM from "react-dom/client"; // Update this line
import { BrowserRouter as Router } from "react-router-dom"; // Add this line

import store from "./Config/store/store.ts";
import { Provider } from "react-redux";

import App from "./App.tsx";

import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    // ThemeProvider

    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
} else {
  console.error("Element with id 'root' not found.");
}
