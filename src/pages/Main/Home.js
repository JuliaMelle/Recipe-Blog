import React from "react";
import "./Index.css";
import assets from "./ad.png";
import RecipeList from "./GourmetDisplay";

function IndexPage() {
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
      </div>
      <div>
        <RecipeList />
      </div>
      <div className="footer">
        <section className="footer-subscription">
          <p className="footer-heading">Presented to you by Group 7</p>
          <p className="footer-text">
            Miguel Fajardo, Marshal Thomas Draico T. Gallardo, Arianne Ashley
            Manaog, Julia Melle T. Pascua, Richwin Kyle Reyes
          </p>
        </section>
      </div>
    </div>
  );
}

export default IndexPage;
