'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  mainImage?: string;
  createdAt?: string; // ახალი ველი პროდუქტის შექმნის თარიღისთვის
}

const LatestProducts: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/products');
        const sorted = res.data.sort((a: Product, b: Product) => b.id - a.id);
        setLatestProducts(sorted.slice(0, 4));
      } catch (err) {
        console.error('ბოლო პროდუქტების ჩატვირთვა ვერ მოხერხდა', err);
      }
    };
    fetchLatest();
  }, []);

  const getProductImage = (product: Product) => {
    if (product.mainImage) {
      return product.mainImage.startsWith("http")
        ? product.mainImage
        : `http://localhost:3001${product.mainImage}`;
    } 
    return "/placeholder.png";
  };

  // ფუნქცია პროდუქტის ახალი თვისების შესამოწმებლად (7 დღის შიგნით)
  const isNewProduct = (product: Product) => {
    if (!product.createdAt) return false;
    const createdDate = new Date(product.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  return (
    <div style={{ width: "100%", maxWidth: "1320px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 20 }}>
        🛍️ ბოლოს დამატებული
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {latestProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div
              className="product-card"
              style={{
                position: "relative",
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "360px",
              }}
            >
              {/* Badge */}
              {isNewProduct(product) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-16px",
                    backgroundColor: "#000000ff",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                ახალი
                </div>
              )}

              <div>
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginBottom: "15px"
                  }}
                />
                <h3 style={{ marginBottom: "10px" }}>{product.name}</h3>
                {product.description && (
                  <p style={{ marginBottom: "10px", color: "#555" }}>
                    {product.description.slice(0, 20) + "..."}
                  </p>
                )}
              </div>
              <strong style={{ fontSize: "16px", color: "#000", display: "flex", justifyContent: "end" }}>
                {product.price} ₾
              </strong>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default LatestProducts;
