import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/routing/app-router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
