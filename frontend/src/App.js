import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { io } from "socket.io-client";
import AdminLayout from "./Layouts/AdminLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import adminRoutes from "./Routes/adminRoutes";
import publicRoutes from "./Routes/routes";
import { persistor, store } from "./redux/store";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:8000", { withCredentials: true });

    // Example event listeners
    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server");
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <DefaultLayout>
                        <Component />
                      </DefaultLayout>
                    }
                  ></Route>
                );
              })}
              {adminRoutes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <AdminLayout>
                        <Component />
                      </AdminLayout>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
