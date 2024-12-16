import { useEffect, useState } from "react";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedStock, setUpdatedStock] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);

  useEffect(() => {
    fetch("https://675b11f69ce247eb19358cca.mockapi.io/api/td1/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setUpdatedStock(product.stock);
    setUpdatedPrice(product.price); // Initialize price
  };

  const handleSave = async (productId) => {
    const updatedProduct = {
      stock: Number(updatedStock).toFixed(),
      price: Number(updatedPrice).toFixed(2),
    };

    try {
      const response = await fetch(
        `https://675b11f69ce247eb19358cca.mockapi.io/api/td1/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Updated product:", result);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, ...updatedProduct } : product
        )
      );
      console.log("Product ID to update:", productId);
      setEditingProductId(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      await fetch(
        `https://675b11f69ce247eb19358cca.mockapi.io/api/td1/products/${id}`,
        { method: "DELETE" }
      );
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <>
      <h2>Inventory</h2>
      <div className="container-products">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="products-preview" key={product.id}>
              <div className="products-infos">
                <h2>{product.title}</h2>
                <h4>{product.year} </h4>
                <div className="price">
                  <p className="priceTag">{product.currency}</p>
                  {editingProductId === product.id ? (
                    <>
                      <input
                        className="input-price"
                        type="number"
                        step="0.01"
                        value={updatedPrice}
                        onChange={(e) =>
                          setUpdatedPrice(Number(e.target.value) || 0)
                        }
                      />
                    </>
                  ) : (
                    <p className="priceTag">{product.price}</p>
                  )}
                </div>
                <div className="stocks">
                  <p>Stock: </p>
                  {editingProductId === product.id ? (
                    <>
                      <input
                        className="input-stock"
                        type="number"
                        value={updatedStock}
                        onChange={(e) =>
                          setUpdatedStock(Number(e.target.value))
                        }
                      />

                      <button
                        className="edit"
                        onClick={() => handleSave(product.id)}>
                        &#128190;
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="count">{product.stock}</p>
                      <div className="buttons-count">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="edit">
                          &#129668;
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product.id)}>
                  &#x274c;
                </button>
              </div>
              <div className="img-container">
                <img src={product.imgSrc} alt={product.title} />
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </>
  );
};

export default MainPage;
