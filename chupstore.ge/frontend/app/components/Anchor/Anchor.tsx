'use client'

import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd';
import { PercentageOutlined, FireOutlined, GiftOutlined, StarOutlined } from '@ant-design/icons';
import './Anchor.css';

type TabPosition = 'top';

const App: React.FC = () => {
  const [tabPosition] = useState<TabPosition>('top');
  const [activeKey, setActiveKey] = useState('1');

  const tabs = [
    {
      key: '1',
      label: 'ყველაზე გაყიდვადი',
      icon: <FireOutlined style={{ marginRight: 6 }} />,
      content: (
        <div className="sale-banner">
        <div className="banner-content">
          <h1>დიდი გაყიდვები!</h1>
          <p>შეიძინე შენი საყვარელი პროდუქტი 50% ფასდაკლებით</p>
          <button className="shop-button">ყიდვა</button>
        </div>
      </div>
      ),
    },
    {
      key: '2',
      label: 'SALE',
      icon: <PercentageOutlined style={{ marginRight: 6 }} />,
      content: (
        <div className="sale-banner">
        <div className="banner-content">
          <h1>დიდი გაყიდვები!</h1>
          <p>შეიძინე შენი საყვარელი პროდუქტი 50% ფასდაკლებით</p>
          <button className="shop-button">ყიდვა</button>
        </div>
      </div>
      ),
    },
    {
      key: '3',
      label: 'ახალი',
      icon: <GiftOutlined style={{ marginRight: 6 }} />,
      content: (
        <div className="sale-banner">
        <div className="banner-content">
          <h1>დიდი გაყიდვები!</h1>
          <p>შეიძინე შენი საყვარელი პროდუქტი 50% ფასდაკლებით</p>
          <button className="shop-button">ყიდვა</button>
        </div>
      </div>
      ),
    },
    {
      key: '4',
      label: 'რეკომენდაცია',
      icon: <StarOutlined style={{ marginRight: 6 }} />,
      content: (
        <div className="sale-banner">
        <div className="banner-content">
          <h1>დიდი გაყიდვები!</h1>
          <p>შეიძინე შენი საყვარელი პროდუქტი 50% ფასდაკლებით</p>
          <button className="shop-button">ყიდვა</button>
        </div>
      </div>
      ),
    },
  ];

  // Tab სტილი
  const tabStyle = (key: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '8px 20px',
    borderRadius: 8,
    border: '1px solid #000',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: activeKey === key ? '#000' : '#fff',
    color: activeKey === key ? '#fff' : '#000',
    transition: 'all 0.3s',
  });

  // Autoplay: ყოველ 3 წამში გადართვა
  useEffect(() => {
    const keys = tabs.map(tab => tab.key);
    const interval = setInterval(() => {
      const currentIndex = keys.indexOf(activeKey);
      const nextIndex = (currentIndex + 1) % keys.length;
      setActiveKey(keys[nextIndex]);
    }, 3000); // 3000ms = 3 წამი
    return () => clearInterval(interval);
  }, [activeKey]);

  return (
    <div style={{ width: "100%", maxWidth: 1320, margin: "0 auto", padding: "30px 20px" }}>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        tabPosition={tabPosition}
        
        items={tabs.map(tab => ({
          key: tab.key,
          label: <div style={tabStyle(tab.key)}>{tab.icon}{tab.label}</div>,
          children: tab.content,
        }))}
      />
    </div>
  );
};

export default App;
    