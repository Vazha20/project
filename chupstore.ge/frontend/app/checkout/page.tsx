'use client';

import React, { useState } from 'react';
import { useCart } from '../components/context/CartContext';
import { useAuth } from '../components/context/AuthContext';
import { Button, Card, Row, Col, Typography, Divider, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

// ✅ Inter ფონტი
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
});

const { Title, Text } = Typography;

// Login მოდალი dynamic import-ით
const Login = dynamic(() => import('../components/Login/Login'), { ssr: false });

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeItemFromCart, clearCart } = useCart();
  const { user } = useAuth(); // ავტორიზაციის სტატუსი
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false); // login modal-ის კონტროლი

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0)
    return (
      <div
        className={inter.className} // ✅ Inter ფონტი
        style={{ textAlign: 'center', padding: '200px 20px', height: '70vh' }}
      >
        <h2 style={{ fontSize: 26 }}>🛒 კალათა ცარიელია</h2>
        <Button
          type="primary"
          size="large"
          shape="round"
          style={{
            backgroundColor: '#000000ff',
            border: 'none',
            marginTop: 24,
            padding: '0 40px',
            fontWeight: 500,
            fontSize: 16,
          }}
          onClick={() => router.push('/products')}
        >
          დაბრუნდი პროდუქტებზე
        </Button>
      </div>
    );

  return (
    <div
      className={inter.className} // ✅ Inter ფონტი მთელ გვერდზე
      style={{
        maxWidth: 1320,
        margin: '40px auto',
        padding: '0 30px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* სათაური და კალათის გასუფთავების ღილაკი */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40,
        }}
      >
        <Title level={3} style={{ fontWeight: 700, margin: 0 }}>
          შენს კალათაში {totalQuantity} ნივთია
        </Title>

        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          style={{
            color: '#999',
            fontWeight: 500,
            transition: '0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(159, 13, 0, 1)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
          onClick={() => {
            clearCart();
            message.success('კალათა წარმატებით გასუფთავდა 🧹');
          }}
        >
          კალათის გასუფთავება
        </Button>
      </div>

      {/* Checkout ლეიაუტი */}
      <Row gutter={[32, 32]}>
        <Col xs={24} md={16}>
          <Card
          
            style={{
              borderRadius: 18,
              boxShadow: '0 6px 22px rgba(0,0,0,0.06)',
              padding: '24px 32px',
              transition: 'all 0.3s ease',
            }}
          >
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #f3f3f3',
                  paddingBottom: 20,
                  marginBottom: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <img
                    src={
                      item.image?.startsWith('http')
                        ? item.image
                        : `http://localhost:3001${item.image}`
                    }
                    alt={item.name}
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 12,
                      objectFit: 'cover',
                      boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                    }}
                  />
                 <div style={{ display: "flex",flexDirection: "column"}}>
  <div style={{ fontWeight: 600, fontSize: 16}}>
    {item.name}
  </div>
  <div style={{ fontSize: 14, marginRight: 8, color: "#777" }}>
    {item.size}
  </div>
  <div style={{ fontSize: 14,fontWeight: 600 }}>
    {item.price.toFixed(2)} ₾
  </div>
</div>

                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Button
                    shape="circle"
                    onClick={() => updateQuantity(item.id, item.size!, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <Text strong style={{ minWidth: 20, textAlign: 'center' }}>
                    {item.quantity}
                  </Text>
                  <Button
                    shape="circle"
                    onClick={() => updateQuantity(item.id, item.size!, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => removeItemFromCart(item.id, item.size)}
                  />
                </div>
              </div>
            ))}
          </Card>
        </Col>

        {/* შეკვეთის შეჯამება */}
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 18,
              boxShadow: '0 6px 22px rgba(0,0,0,0.06)',
              padding: '30px 24px',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <Text>ღირებულება</Text>
              <Text strong>{totalPrice.toFixed(2)} ₾</Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <Text>მიტანის ღირებულება</Text>
              <Text strong>0 ₾</Text>
            </div>

            <Divider style={{ margin: '20px 0' }} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              <span>გადასახდელი თანხა</span>
              <span style={{ color: '#000000ff' }}>{totalPrice.toFixed(2)} ₾</span>
            </div>

            <Button
              type="primary"
              block
              size="large"
              style={{
                backgroundColor: '#000000ff',
                border: 'none',
                height: 52,
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: 0.3,
              }}
              onClick={() => {
                if (!user) {
                  setShowLogin(true); // თუ არ არის ავტორიზებული, მოდალი
                } else {
                  router.push('/checkout');
                }
              }}
            >
              შეკვეთა
            </Button>
          </Card>
        </Col>
      </Row>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}
