// src/components/ItemDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, get, remove, onValue } from "firebase/database";
import app from "../../FirebaseConfig";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const database = getDatabase(app);

  useEffect(() => {
    const itemRef = ref(database, `items/${id}`);
    get(itemRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setItem(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
    </div>
  );
}

export default ItemDetail;
