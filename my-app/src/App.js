import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';


function App() {
  return (
     

          <div className="main">
            <PathfindingVisualizer />
          </div>



  );
}

export default App;
