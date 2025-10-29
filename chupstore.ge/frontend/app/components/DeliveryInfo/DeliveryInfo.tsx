'use client'

import React from "react";
import { Card, Typography, Space } from "antd";
import {
  CarOutlined,
  CreditCardOutlined,
  ReloadOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const iconStyle = { fontSize: 40, color: "#000000" }; 

const services: ServiceItem[] = [
  {
    icon: <CarOutlined style={iconStyle} />,
    title: "სწრაფი მიწოდება",
    desc: "თბილისში 1 დღეში, რეგიონებში 2-3 სამუშაო დღეში.",
  },
  {
    icon: <CreditCardOutlined style={iconStyle} />,
    title: "უსაფრთხო გადახდა",
    desc: "გადაიხადე ბარათით ან კურიერთან ნაღდი ანგარიშსწორებით.",
  },
  {
    icon: <ReloadOutlined style={iconStyle} />,
    title: "დაბრუნება 7 დღეში",
    desc: "პროდუქტის დაბრუნება შესაძლებელია 7 დღეში, თუ არ მოგეწონა.",
  },
  {
    icon: <CustomerServiceOutlined style={iconStyle} />,
    title: "მომხმარებელთა მხარდაჭერა",
    desc: "დაგვიკავშირდი 24/7 ჩატში ან ტელეფონით.",
  },
];

const DeliveryInfo: React.FC = () => {
  return (
    <div>
      <div style={{ maxWidth: "1320px", margin: "0 auto", textAlign: "center",padding: "40px 20px" }}>
        <Title level={2} style={{ marginBottom: 40 }}>
          🚚 მიწოდება და სერვისები
        </Title>

        {/* Horizontal scroll container */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            paddingBottom: "10px",
            scrollbarWidth: "thin",
          }}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              hoverable
              style={{
                minWidth: 250, // თითოეული ქარდის ზომა
                borderRadius: 16,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              bodyStyle={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Space direction="vertical" align="center" size="middle">
                {service.icon}
                <Title level={4} style={{ margin: 0 }}>
                  {service.title}
                </Title>
                <Paragraph style={{ margin: 0, color: "#555" }}>
                  {service.desc}
                </Paragraph>
              </Space>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
