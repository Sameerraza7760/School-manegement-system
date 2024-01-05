// App.tsx

import AppRouter from "./Config/Router/Router";
import ErrorBoundary from "./ErrrorBoundry/ErrorBoundry";

function App(): JSX.Element {
  return (
    // <Provider store={store}>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>

    // </Provider>
  );
}

export default App;
