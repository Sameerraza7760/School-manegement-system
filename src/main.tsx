import ReactDOM from "react-dom/client"; // Update this line
import { BrowserRouter as Router } from "react-router-dom"; // Add this line
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import { persistor } from "./../src/Config/store/store.ts";
import store from "./../src/Config/store/store.ts";

import App from "./App.tsx";

import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    // ThemeProvider

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  );
} else {
  console.error("Element with id 'root' not found.");
}
