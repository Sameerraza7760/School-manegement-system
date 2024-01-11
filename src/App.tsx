// App.tsx

import AppRouter from "./Config/routes/Router";
import StudentDashboard from "./Pages/Student/StudentProfile/StudentDashboard/StudentDashboard";
// import ErrorBoundary from "./ErrrorBoundry/ErrorBoundry";

function App(): JSX.Element {
  return (
    // <Provider store={store}>

    <>
      {/* <StudentDashboard /> */}
      
    <AppRouter />
    </>

    // </Provider>
  );
}

export default App;
