import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';
import Navbar from './NavBar1';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null); // State để lưu hình ảnh đang hover
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
        localStorage.setItem("products", JSON.stringify(data));
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleImageClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const formatCurrency = (price) => {
    // Chuyển đổi giá thành số
    const priceNumber = Number(price);

    // Định dạng giá với dấu phân cách hàng nghìn
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);

    return `${formattedPrice} VND`;
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div style={styles.container}>
      <HeaderComponent />
      <div style={styles.mainContent}>
        <Navbar
          categories={categories}
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
        <div style={styles.productGrid}>
          {filteredProducts.map((product, i) => (
            <div
              key={i}
              style={{ ...styles.productCard, ...(hoveredImage === product._id.$oid ? styles.productCardHover : {}) }}
            >
              <img
                src={product.img1}
                alt={product.name}
                style={{ ...styles.productImage, ...(hoveredImage === product._id.$oid ? styles.productImageHover : {}) }}
                onClick={() => handleImageClick(product._id.$oid)}
                onMouseEnter={() => setHoveredImage(product._id.$oid)}
                onMouseLeave={() => setHoveredImage(null)}
              />
              <h2 style={styles.productName}>{product.name.toUpperCase()}</h2>
              <p style={styles.productPrice}>{formatCurrency(product.price)}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  mainContent: {
    display: 'flex',
    padding: '20px',
    gap: '20px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    flex: '1',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease', // Thêm hiệu ứng khi hover
  },
  productCardHover: {
    transform: 'scale(1.02)', // Phóng to khi hover
  },
  productImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
    transition: 'filter 0.3s ease', // Thêm hiệu ứng mờ cho ảnh
  },
  productImageHover: {
    filter: 'blur(3px)', // Hiệu ứng mờ
  },
  productName: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0 5px 0',
    textTransform: 'uppercase', // Chữ viết hoa
  },
  productPrice: {
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default ShopPage;
