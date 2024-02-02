// App.tsx

import AppRouter from "./Config/routes/Router";

// import ErrorBoundary from "./ErrrorBoundry/ErrorBoundry";

function App(): JSX.Element {
  return (
    // <Provider store={store}>

    <>
      {/* <StudentDashboard /> */}
      
    <AppRouter />
    
{/* <TeacherDashboard/> */}
    {/* <StudentDashboard/> */}
    </>

    // </Provider>
  );
}

export default App;
