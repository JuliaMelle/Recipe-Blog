import Navbar from "../components/Navbar";
import React from "react";
import assets from "../assets/adobo2.png";
import "./Inew.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemList from "./FetchData";
import ItemDetail from "./ItemDetail"; // Create this component to show item details

function Inew() {
  return (
    <div>
      <div className="first-pic-container">
        <img className="pic" src={assets} alt="adobo" />
        <div class="info">
          <br />
          <br />
          <br />
          <h1> Welcome to Gourmetgathering! </h1>
          <p>
            Welcome to our culinary community, where flavors converge and
            creativity thrives! <br /> Dive into a world of tantalizing tastes
            and aromatic adventures with our recipe blog and forums.
            <br /> Come hungry, leave inspired!
          </p>
        </div>
        <div className="Comps">
          <ItemList />
          <ItemDetail />
        </div>
      </div>
    </div>
  );
}

export default Inew;
