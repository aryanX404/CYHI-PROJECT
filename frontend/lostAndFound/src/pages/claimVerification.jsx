import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./claimVerification.css";

export default function ClaimVerification() {
  const { id } = useParams(); 
  const { user, isAuthenticated } = useAuth0();
  const [item, setItem] = useState(null);
  const [form, setForm] = useState({ description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await axios.get(`http://localhost:8000/claim/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("⚠️ Please log in to claim this item.");
      return;
    }

    try {
      await axios.post(`http://localhost:8000/verify/${id}`, {
        userEmail: user.email,
        description: form.description,
      });
      alert("✅ Claim submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit claim.");
    }
  };

  if (!item) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="verification-container">
      {/* LEFT SIDE - Item Details */}
      <div className="verification-left">
        {item.photo && (
          <img
            src={`http://localhost:8000/${item.photo}`}
            alt="Item"
            className="verification-img"
          />
        )}
        <div className="verification-details">
          <h3>{item.category}</h3>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {item.date}</p>
          <p>{item.description}</p>
          {item.foundBy ? (
            <p><strong>Found By:</strong> {item.foundBy.user?.name || "Anonymous"}</p>
          ) : (
            <p><strong>Found By:</strong> Anonymous</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Claim Form */}
      <div className="verification-right">
        <h2>Claim Verification</h2>
        <form onSubmit={handleSubmit} className="claim-form">
          <textarea
            name="description"
            placeholder="Describe your belonging in detail (unique marks, contents, etc.)..."
            value={form.description}
            onChange={handleChange}
            required
            rows={10}
            className="claim-textarea"
          />
          <button type="submit" className="submit-btn">Submit Claim</button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="cancel-btn"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
