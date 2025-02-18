import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/sonner";
import { appStore } from "./redux/store";
import { useGetUserProfileDetailsQuery } from "./features/api/authApi";
import LoadingSpinner from "./components/Loader";

const Custom = ({ children }) => {
  const { isLoading } = useGetUserProfileDetailsQuery();
  return <>{isLoading ? <LoadingSpinner /> : <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>
);
