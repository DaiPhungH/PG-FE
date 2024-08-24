import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74'
      );
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu sản phẩm...</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id.$oid} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
