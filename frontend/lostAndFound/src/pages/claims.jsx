import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function claims() {
const [claimedItem, setClaimedItem] = useState([])
const { user} = useAuth0();

useEffect(() => {
  const fetchClaimedItems = async () => {
    try {
      const res = await axios.get("http://localhost:8000/getfounditems");
      const myItems = res.data.filter(item => item.claimedBy === user.email); // use email for consistency
      setClaimedItem(myItems);
    } catch (error) {
      console.error(error);
    }
  };

  if (user) fetchClaimedItems();
}, [user]);

return (
  <div className="claim-container">
    <h1>CLAIMED ITEMS</h1>
    {claimedItem.length === 0 ? (
      <p>You have no claimed items.</p>
    ) : (
      <div className="card-container" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {claimedItem.map(item => (
          <div key={item._id} className="item-card">
            {item.photo && <img src={`http://localhost:8000/${item.photo}`} alt="item" style={{width: '150px', height: '150px', objectFit: 'cover'}} />}
            <h3>{item.category}</h3>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
)};
