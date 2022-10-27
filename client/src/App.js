import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from './component/AppRouter'
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>  
  );
}

export default App;
