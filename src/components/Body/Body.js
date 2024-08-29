import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import product_1 from './Resource Assignment 03/product_1.png';
import product_2 from './Resource Assignment 03/product_2.png';
import product_3 from './Resource Assignment 03/product_3.png';
import product_4 from './Resource Assignment 03/product_4.png';
import product_5 from './Resource Assignment 03/product_5.png';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null); // State to keep track of hovered image
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
        localStorage.setItem("products", JSON.stringify(data));
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (price) => {
    const priceNumber = Number(price);
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);
    return `${formattedPrice} VND`;
  };

  const handleCategoryClick = () => {
    navigate('/shop');
  };

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <div style={styles.imageGrid}>
        <div style={styles.row}>
          <img
            src={product_1}
            alt="iPhone"
            style={{ ...styles.gridImage, ...(hoveredImage === 'product_1' ? styles.gridImageHover : {}) }}
            onClick={handleCategoryClick}
            onMouseEnter={() => setHoveredImage('product_1')}
            onMouseLeave={() => setHoveredImage(null)}
          />
          <img
            src={product_2}
            alt="Mac"
            style={{ ...styles.gridImage, ...(hoveredImage === 'product_2' ? styles.gridImageHover : {}) }}
            onClick={handleCategoryClick}
            onMouseEnter={() => setHoveredImage('product_2')}
            onMouseLeave={() => setHoveredImage(null)}
          />
          <img
            src={product_3}
            alt="iPad"
            style={{ ...styles.gridImage, ...(hoveredImage === 'product_3' ? styles.gridImageHover : {}) }}
            onClick={handleCategoryClick}
            onMouseEnter={() => setHoveredImage('product_3')}
            onMouseLeave={() => setHoveredImage(null)}
          />
        </div>
        <div style={styles.row}>
          <img
            src={product_4}
            alt="Watch"
            style={{ ...styles.gridImage, ...(hoveredImage === 'product_4' ? styles.gridImageHover : {}) }}
            onClick={handleCategoryClick}
            onMouseEnter={() => setHoveredImage('product_4')}
            onMouseLeave={() => setHoveredImage(null)}
          />
          <img
            src={product_5}
            alt="AirPods"
            style={{ ...styles.gridImage, ...(hoveredImage === 'product_5' ? styles.gridImageHover : {}) }}
            onClick={handleCategoryClick}
            onMouseEnter={() => setHoveredImage('product_5')}
            onMouseLeave={() => setHoveredImage(null)}
          />
        </div>
      </div>

      <h1>TOP TRENDING PRODUCTS</h1>
      <div style={styles.productGrid}>
        {products.map((product, i) => (
          <div
            key={i}
            style={{ ...styles.productCard, ...(hoveredImage === product._id.$oid ? styles.productCardHover : {}) }}
            onClick={() => handleProductClick(product._id.$oid)}
            onMouseEnter={() => setHoveredImage(product._id.$oid)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img
              src={product.img1}
              alt={product.name}
              style={{ ...styles.productImage, ...(hoveredImage === product._id.$oid ? styles.productImageHover : {}) }}
            />
            <h2 style={styles.productName}>{product.name.toUpperCase()}</h2>
            <p style={styles.productPrice}>{formatCurrency(product.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  imageGrid: {
    marginBottom: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  gridImage: {
    width: '150px',
    height: '150px',
    margin: '0 10px',
    cursor: 'pointer',
    transition: 'filter 0.3s ease', // Smooth transition for hover effect
  },
  gridImageHover: {
    filter: 'blur(3px)', // Blur effect on hover
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    padding: '20px',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, filter 0.3s ease', // Smooth transition for hover effect
  },
  productCardHover: {
    transform: 'scale(1.02)', // Scale effect on hover
  },
  productImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
    transition: 'filter 0.3s ease', // Smooth transition for hover effect
  },
  productImageHover: {
    filter: 'blur(3px)', // Blur effect on hover
  },
  productName: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0 5px 0',
    textTransform: 'uppercase', // Uppercase text
  },
  productPrice: {
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default ProductList;
