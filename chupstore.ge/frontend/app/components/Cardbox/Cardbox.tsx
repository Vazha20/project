
"use client";

import { useRef, useState, useEffect } from "react";
import { Card } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import styles from "./Cardbox.module.css";

const categories = [
  { id: 1, href: "/products", name: "ყველა კატეგორია", dark: true, icon: <AppstoreOutlined style={{ fontSize: 28 }} /> },
  { id: 2, name: "ორეული", image: "/shirt.png" },
  { id: 3, name: "კაბა", image: "/shirt.png" },
  { id: 4, name: "შარვალი", image: "/shirt.png" },
  { id: 5, name: "პერანგი", image: "/shirt.png" },
  { id: 6, name: "ქვედაბოლო", image: "/shirt.png" },
  { id: 7, name: "პალტო", image: "/shirt.png" },
  { id: 8, name: "ქურთუკი", image: "/shirt.png" },
  { id: 9, name: "მაისური", image: "/shirt.png" },
  { id: 10, name: "პიჯაკი", image: "/shirt.png" },
  { id: 11, name: "ფრენჩი", image: "/shirt.png" },
];

export default function Cardbox() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const scrollLeft = () => scrollRef.current && (scrollRef.current.scrollLeft -= 300);
  const scrollRight = () => scrollRef.current && (scrollRef.current.scrollLeft += 300);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const container = scrollRef.current;
    handleScroll();
    container?.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setLoaded(true), 150); // მსუბუქი transition
    return () => {
      container?.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${loaded ? styles.loaded : ""}`}
    >
      {canScrollLeft && (
        <button className={styles.button} onClick={scrollLeft}>{"<"}</button>
      )}

      <div ref={scrollRef} className={styles.scrollContainer}>
        {categories.map((cat) => (
          <div key={cat.id} className={styles.slide}>
            <Card
              hoverable
              className={`${styles.card} ${cat.dark ? styles.dark : styles.light}`}
              style={{ padding: 12 }}
            >
              {cat.dark ? (
                <div className={styles.content}>
                  {cat.icon}
                  <p>{cat.name}</p>
                </div>
              ) : (
                <>
                  {cat.image && <img src={cat.image} alt={cat.name} className={styles.image} />}
                  <p className={styles.text}>{cat.name}</p>
                </>
              )}
            </Card>
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button className={styles.buttontwo} onClick={scrollRight}>{">"}</button>
      )}
    </div>
  );
}
