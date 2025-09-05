import React, { useState, useRef } from "react";
import "./postItem.css";

export default function PostItem() {
  const [item, setItem] = useState({
    category: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    hiddenDetails: "",
    photo: null,
    preview: null,
  });

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItem({
        ...item,
        photo: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item Posted:", item);
    alert("Item posted successfully 🚀 (check console for data)");
  };

  return (
    <div className="post-container">
      <h1 className="post-title">Post a Found Item</h1>

      <form onSubmit={handleSubmit} className="post-form">
        {/* Left: Image Upload */}
        <div className="left-panel">
          <label className="form-label">Upload Photo</label>
          
          

          <div className="upload-box"onClick={() => fileInputRef.current && fileInputRef.current.click()} >
            {item.preview ? (
              <img src={item.preview} alt="Preview" className="preview-img" />
            ) : (
              <p className="upload-text"><i class="fa-solid fa-file-import"></i></p>
            )}
            <input
              type="file"
              className="file-input"
              ref={fileInputRef}
              onChange={handleImageChange}
              required
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Right: Form Fields */}
        <div className="right-panel">
          <label className="form-label">Category</label>
          <select
            className="form-input"
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="id-card">ID Card</option>
            <option value="wallet">Wallet</option>
            <option value="book">Book</option>
            <option value="bag">Bag</option>
            <option value="others">Others</option>
          </select>

          <label className="form-label">Location Found</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Mess Hall, Library"
            value={item.location}
            onChange={(e) => setItem({ ...item, location: e.target.value })}
            required
          />

          <label className="form-label">Date Found</label>
          <input
            type="date"
            className="form-input"
            value={item.date}
            onChange={(e) => setItem({ ...item, date: e.target.value })}
            required
          />

          <label className="form-label">Public Description</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Black wallet, red stripe"
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            required
          />

          <label className="form-label">Hidden Details</label>
          <textarea
            className="form-input textarea"
            rows="3"
            placeholder="e.g., Contains library card, initials inside bag"
            value={item.hiddenDetails}
            onChange={(e) =>
              setItem({ ...item, hiddenDetails: e.target.value })
            }
          />

          <button type="submit" className="submit-btn">
            Post Item
          </button>
        </div>
      </form>
    </div>
  );
}