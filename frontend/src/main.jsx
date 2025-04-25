import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
// import { SearchProvider } from "./context/SearchContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <AuthProvider> 
      {/* <SearchProvider> */}
        <App />
      {/* </SearchProvider> */}
     </AuthProvider> 
  </StrictMode>
);
