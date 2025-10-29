'use client'

import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import './LatestProducts.css';

const { Meta } = Card;

const LatestProducts: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/products');

        // ბოლოები პირველზე
        const sorted = res.data.sort((a: any, b: any) => b.id - a.id);

        // მხოლოდ ბოლო 4
        setLatestProducts(sorted.slice(0, 4));
      } catch (err) {
        console.error('ბოლო პროდუქტების ჩატვირთვა ვერ მოხერხდა', err);
      }
    };
    fetchLatest();
  }, []);

  const getProductImage = (product: any) => {
    if (product.mainImage) {
      return product.mainImage.startsWith("http")
        ? product.mainImage
        : `http://localhost:3001${product.mainImage}`;
    } else if (product.images && product.images.length > 0) {
      return product.images[0].startsWith("http")
        ? product.images[0]
        : `http://localhost:3001${product.images[0]}`;
    } else {
      return "/placeholder.png";
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "1320px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 20 }}>
        🛍️ ბოლოს დამატებული
      </h2>

      <Row gutter={[24, 24]}>
        {latestProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={6}>
            <Link href={`/products/${product.id}`}>
              <Card
                hoverable
                className='card'
                cover={
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    style={{
                      width: "100%",
                      margin: "0 auto",
                      padding: "20px 0 0 0",
                      height: "240px",
                      objectFit: "contain",
                    }}
                  />
                }
              >
                <Meta
                  title={product.name}
                  description={`ფასი: ${product.price} ₾`}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LatestProducts;
