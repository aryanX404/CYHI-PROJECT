import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import './myclaims.css'

export default function ClaimPage() {
  const { id } = useParams(); // item id
  const { user, isAuthenticated } = useAuth0();
  const [item, setItem] = useState(null);
  const [hiddenDetails, setHiddenDetails] = useState("");

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await axios.get(`http://localhost:8000/getfounditems/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/claim/${id}`, {
        user,
        hiddenDetails
      });

      if (res.data.success) {
        alert("Item successfully claimed!");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error claiming item");
    }
  };

  if (!item) return <p>Loading item...</p>;

  return (
    <div className="claim-container">
      <h1>Claim Item</h1>
      <div className="claim-content">
        <div className="left-claim-content">
          <img src={`http://localhost:8000/${item.photo}`} alt="item" />
          <h3>{item.category}</h3>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {item.date}</p>
          <p>{item.description}</p>
        </div>
        <div className="right-claim-content">
          <form onSubmit={handleSubmit}>
          <label>Enter Hidden Details to Verify Ownership:</label>
          <input
            type="text"
            value={hiddenDetails}
            onChange={(e) => setHiddenDetails(e.target.value)}
            required
          />
        <button className='submit-btn' type="submit">Submit Claim</button>
      </form>
        </div>
      </div>
      

      
    </div>
  );
}
