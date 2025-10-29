'use client';

import Link from 'next/link';
import styles from './BottomNav.module.css';
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Modal } from 'antd';
import Login from '../Login/Login'; // შენს Login კომპონენტს ჩასვამ

export default function BottomNav() {
  const [loginOpen, setLoginOpen] = useState(false);

  const toggleLogin = () => setLoginOpen(!loginOpen);

  return (
    <>
      <nav className={styles.bottomNav}>
        <Link href="/" className={styles.navItem}>
          <HomeOutlined style={{ fontSize: '20px' }} />
          <span>მთავარი</span>
        </Link>

        <Link href="/products" className={styles.navItem}>
          <AppstoreOutlined style={{ fontSize: '20px' }} />
          <span>კატეგორიები</span>
        </Link>

        <button onClick={toggleLogin} className={styles.navItemButton}>
          <UserOutlined style={{ fontSize: '20px' }} />
          <span>შესვლა</span>
        </button>
      </nav>

      
        {loginOpen && <Login onClose={toggleLogin} />}

    </>
  );
}
