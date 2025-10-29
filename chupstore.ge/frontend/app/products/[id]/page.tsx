'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Row, Col, Image, Typography, Card, Button, Space, Tag, Carousel, Radio, Modal, message, Input } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined, LeftOutlined, RightOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { useAuth } from "../../components/context/AuthContext";
import { useCart } from '../../components/context/CartContext'
import "./page.css";

const { Title, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [carouselRef, setCarouselRef] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>(" ");
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});

  const { addItemToCart } = useCart(); 

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct({ ...data, price: Number(data.price) || 0, images: data.images?.length ? data.images : [data.image || " "], sizes: data.sizes?.length ? data.sizes : [" "] }))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) { message.error("პროდუქტის ID ვერ მოიძებნა"); return; }
    Modal.confirm({
      title: "ნამდვილად გსურთ ამ პროდუქტის წაშლა?",
      okText: "დიახ, წაშალე",
      cancelText: "გაუქმება",
      okType: "danger",
      async onOk() {
        try {
          const res = await fetch(`http://localhost:3001/api/products/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json" } });
          const data = await res.json();
          if (res.ok) { message.success("პროდუქტი წაიშალა წარმატებით"); router.push("/products"); }
          else { message.error(data.message || "წაშლა ვერ მოხერხდა"); }
        } catch (err) { console.error(err); message.error("სერვერის შეცდომა ან წაშლა ვერ მოხერხდა"); }
      },
    });
  };

  const handleUpdate = async () => {
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editedProduct) });
      if (res.ok) {
        message.success("პროდუქტი განახლდა");
        const updated = await res.json();
        setProduct(updated);
        setEditMode(false);
      } else message.error("განახლება ვერ მოხერხდა");
    } catch (err) { console.error(err); message.error("სერვერის შეცდომა"); }
  };

  if (loading) return <div style={{ padding: "40px" }}>იტვირთება...</div>;
  if (!product) return <div style={{ padding: "40px" }}>პროდუქტი ვერ მოიძებნა</div>;

  return (
    <div style={{ maxWidth: 1320, padding: "40px 30px", margin: "0 auto" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card>
            <div style={{ position: "relative" }}>
              <Carousel ref={setCarouselRef} dots={false} autoplay={false}>
                {product.images.map((img, idx) => (
                  <div key={idx} className="carousel-slide">
                    <img src={img.startsWith("http") ? img : `http://localhost:3001${img}`} alt={product.name} className="carousel-img" />
                  </div>
                ))}
              </Carousel>
              <LeftOutlined onClick={() => carouselRef?.prev()} style={{ position: "absolute", top: "50%", left: 0, fontSize: 24, color: "#fff", cursor: "pointer", transform: "translateY(-50%)", padding: 8, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "50%" }} />
              <RightOutlined onClick={() => carouselRef?.next()} style={{ position: "absolute", top: "50%", right: 0, fontSize: 24, color: "#fff", cursor: "pointer", transform: "translateY(-50%)", padding: 8, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "50%" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16, gap: 10 }}>
              {product.images.map((img, idx) => (
                <Image key={idx} src={img.startsWith("http") ? img : `http://localhost:3001${img}`} alt={`thumbnail-${idx}`} width={70} height={70} style={{ cursor: "pointer", objectFit: "cover", border: "2px solid #eee" }} onClick={() => carouselRef?.goTo(idx)} />
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {editMode ? (
              <>
                <Input defaultValue={product.name} onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })} placeholder="დასახელება" />
                <Input.TextArea defaultValue={product.description} rows={4} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} placeholder="აღწერა" />
                <Input type="number" defaultValue={product.price} onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })} placeholder="ფასი" />
                <Input defaultValue={product.category} onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })} placeholder="კატეგორია" />
                <Button type="primary" icon={<SaveOutlined />} onClick={handleUpdate} style={{ backgroundColor: "#000", border: "none" }}>შენახვა</Button>
              </>
            ) : (
              <>
                <Title level={2}>{product.name}</Title>
                <Title level={3} style={{ color: "#000000ff" }}>{product.price.toFixed(2)} ლ</Title>
                <Paragraph>{product.description}</Paragraph>

                <div>
                  <strong>ზომა: </strong>
                  <Radio.Group value={selectedSize} optionType="button" buttonStyle="solid">
                    {product.sizes.map((size) => (
                      <Radio.Button key={size} value={size} className="size-btn" onClick={() => setSelectedSize(prev => (prev === size ? "" : size))}>{size}</Radio.Button>
                    ))}
                  </Radio.Group>
                </div>

                <Space>
<Button
  style={{ backgroundColor: "#000", color: "#fff", border: "none" }}
  icon={<ShoppingCartOutlined />}
  size="large"
  onClick={() => addItemToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    size: selectedSize
  })}
>
  კალათაში დამატება
</Button>
                  <Button style={{ backgroundColor: "#fff", color: "#000", border: "1px solid black" }} type="default" icon={<CreditCardOutlined />} size="large">ყიდვა</Button>
                </Space>

                <Tag color="cyan">კატეგორია: {product.category}</Tag>

                {/* მხოლოდ ადმინი ხედავს */}
                {user?.role === "admin" && (
                  <Space style={{ marginTop: 20 }}>
                    <Button icon={<EditOutlined />} onClick={() => setEditMode(true)} style={{ borderColor: "#000" }} className="updbtn">რედაქტირება</Button>
                    <Button danger icon={<DeleteOutlined />} onClick={handleDelete} className="delbtn">წაშლა</Button>
                  </Space>
                )}
              </>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
}
