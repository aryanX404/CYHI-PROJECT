import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import './dashboard.css';

export default function Claims() {
  const [claimedItems, setClaimedItems] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchClaimedItems = async () => {
      try {
        const res = await axios.get("http://localhost:8000/getfounditems");
        // Filter items claimed by the logged-in user
        const myItems = res.data.filter(item => item.claimedBy === user.email);
        setClaimedItems(myItems);
      } catch (error) {
        console.error("Error fetching claimed items:", error);
      }
    };

    if (user) fetchClaimedItems();
  }, [user]);

  return (
    <div className="claim-container">
      <h1>CLAIMED ITEMS</h1>
      {claimedItems.length === 0 ? (
        <p>You have no claimed items.</p>
      ) : (
        <div className="card-container" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {claimedItems.map(item => (
            <div key={item._id} className="item-card">
              {item.photo && (
                <img
                  src={`http://localhost:8000/${item.photo}`}
                  alt="item"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                />
              )}
              <div className="details">
                <h3>{item.category}</h3>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p>{item.description}</p>
                {item.foundBy ? (
                  <p><strong>Found By:</strong> {item.foundBy.user.name}</p>
                ) : (
                  <p><strong>Found By:</strong> Anonymous</p>
                )}
                <p className="claimed-text">✅ Already Claimed</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
