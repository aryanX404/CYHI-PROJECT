import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [items, setItems] = useState([])
  const [filterCategory, setFilterCategory] = useState("all");


  useEffect(() => {
      async function fetchItems() {
        try {
          const res = await axios.get("http://localhost:8000/getfounditems");
          setItems(res.data); // always save full data once
        } catch (err) {
          console.log(err);
        }
      }
      fetchItems();
    }, []);

    // filtering happens here every render
    const filteredItems =
      filterCategory === "all"
        ? items
        : items.filter((item) => item.category === filterCategory);

  return (
    <div className="dashboard">
      <h1>FOUND ITEMS</h1>
      <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
            className="form-input filter"
            // value={item.category}
            // onChange={(e) => setItem({ ...item, category: e.target.value })}
            required
          >
            <option value="all"  >all</option>
            <option value="id-card">ID Card</option>
            <option value="wallet">Wallet</option>
            <option value="book">Book</option>
            <option value="bag">Bag</option>
            <option value="others">Others</option>
      </select>
      
      <div className="card-container" style={{display: 'flex', flexWrap: 'wrap', gap: '16px'}}>
        {filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : null}
        {
        filteredItems.map(item => (
          <div key={item._id} className="item-card">
            {item.photo && (
              <img src={`http://localhost:8000/${item.photo}`} alt="item" />
            )}
            <div className="details">
              <h3>{item.category}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <p>{item.description}</p>
              {item.foundBy ? (
                <p>
                  <strong>Found By:</strong>{" "}
                  {item.foundBy.user.name || 'Anomymous'}
                </p>
              ):(
                <p><strong>Found By:</strong> Anonymous</p>
              )}
              {!item.claimed ? (
                <button
                  onClick={() => navigate(`/myclaims/${item._id}`)}
                  className="claim-btn"
                >
                  Claim
                </button>
              ) : (
                <p className="claimed-text">✅ Already Claimed</p>
              )}
            </div>

            
          </div>
        ))}
      </div>

    </div>
  )
}

