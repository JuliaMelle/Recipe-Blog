// src/components/ItemList.js
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Index.css"; // Make sure to create this file for styling

function ItemList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const itemsArray = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setItems(itemsArray);
    });
  }, []);

  return (
    <div className="item-list">
      {items.map((item) => (
        <div
          key={item.id}
          className="item"
          onClick={() => navigate(`/item/${item.id}`)}
        >
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
