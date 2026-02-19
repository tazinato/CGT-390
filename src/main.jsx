import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { ModeProvider } from "./Context/ModeContext.jsx";
import { ProfilesProvider } from "./Context/ProfilesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ModeProvider>
      <ProfilesProvider>
        <App />
      </ProfilesProvider>
    </ModeProvider>
  </HashRouter>
);