import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { InterestProvider } from "./context/InterestContext.jsx";
// import { SearchProvider } from "./context/SearchContext";
import App from "./App.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <AuthProvider> 
      <InterestProvider>
        <NotificationProvider>
        <App />
        </NotificationProvider>
        </InterestProvider>
     </AuthProvider> 
  </StrictMode>
);
