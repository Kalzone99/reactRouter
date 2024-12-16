import React, { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("€");
  const [year, setYear] = useState("");
  const [stock, setStock] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      title,
      price,
      currency,
      year,
      stock,
      imgSrc,
    };

    try {
      const response = await fetch(
        "https://675b11f69ce247eb19358cca.mockapi.io/api/td1/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
      if (response.ok) {
        alert("New item created successfully!");

        setTitle("");
        setPrice("");
        setYear("");
        setStock("");
        setImgSrc("");
      } else {
        alert("Failed to create item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="Create-object">
      <h2>Create New Entry</h2>
      <div className="create-entity">
        <form onSubmit={handleSubmit} className="create-inputs">
          <div className="create-title">
            <label>Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Insert the name of the product"
              required
            />
          </div>
          <div className="create-price">
            <label>Price: </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Insert the price of the product"
              required
            />
          </div>
          <div className="create-year">
            <label>Year: </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Insert the year the product was launched"
              required
            />
          </div>
          <div className="create-stock">
            <label>Stock: </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Insert the number of items in stock"
              required
            />
          </div>
          <div className="create-img">
            <label>Image URL: </label>
            <input
              type="url"
              value={imgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
              placeholder="image source"
              required
            />
          </div>
          <div className="create-button-container">
            <button type="submit" id="create-button">
              New Entry
            </button>
          </div>
        </form>
        <div className="preview-image">
          <h5 className="bigLogo">Shop</h5>
          <div className="bigLogoImage"></div>
          <h5 className="bigLogo">IT</h5>
        </div>
      </div>
    </div>
  );
};

export default Create;
