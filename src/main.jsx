import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CoinContextProvider from "./context/CoinContext.jsx";
import { RowProvider } from "./context/RowContext"; // Add this import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CoinContextProvider>
        <RowProvider>
          <App />
        </RowProvider>
      </CoinContextProvider>
    </BrowserRouter>
  </StrictMode>
);
