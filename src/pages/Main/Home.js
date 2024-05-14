import React from "react";
import "./Index.css";
import ItemList from "./FetchData";
import ItemDetail from "./ItemDetail"; // Create this component to show item details
import assets from "./ad.png";

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
        <div className="Comps">
          <ItemList />
          <ItemDetail />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
