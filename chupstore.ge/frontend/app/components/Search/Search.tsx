'use client'; // Next.js 13+ app directory-ში საჭირო, თუ კომპონენტი client-side იყენებს

import { useState, useEffect, useRef, JSX } from "react";
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Search.module.css';

export default function Search(): JSX.Element {

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const toggleSearch = () => setOpenSearch(!openSearch);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpenSearch(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <div className={styles.iconBox}>
        <SearchOutlined onClick={toggleSearch} className={styles.icon} />
      </div>

      {openSearch && (
        <div className={styles.searchcontainer} ref={searchRef}>
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
