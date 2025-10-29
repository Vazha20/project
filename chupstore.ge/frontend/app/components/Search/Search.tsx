'use client'

import { useState } from "react";
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Search.module.css';

export default function Search() {

  const [openSearch, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen(!openSearch)

  return (
    <>
      <div className={styles.iconBox}>
  <SearchOutlined onClick={toggleSearch} className={styles.icon} />
</div>

{openSearch && (
  <div className={styles.searchcontainer}>
    <div className={styles.iconBox}>
      <SearchOutlined className={styles.searchicon} />
    </div>
    <input
      type="text"
      placeholder="Search..."
      className={styles.searchInput}
      autoFocus
    />
    <div className={styles.iconBox}>
      <CloseOutlined onClick={toggleSearch} className={styles.closeIcon} />
    </div>
  </div>
)}

    </>
  );
}