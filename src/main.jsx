import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";  
import App from "./App.jsx";
import { ModeProvider } from "./Context/ModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ModeProvider>
      <App />
    </ModeProvider>
  </HashRouter>
);