"use client";

import { useRef, useState, useEffect } from "react";
import { Card } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./Cardbox.module.css";

const categories = [
  { id: 1, name: "ყველა კატეგორია", dark: true, icon: <AppstoreOutlined style={{ fontSize: 28 }} />, href: "/products" },
  { id: 2, name: "ორეული", image: "/oreuli.png", href: "/products?category=ორეული" },
  { id: 3, name: "კაბა", image: "/kaba.png", href: "/products?category=კაბა" },
  { id: 4, name: "შარვალი", image: "/sharvali.png", href: "/products?category=შარვალი" },
  { id: 5, name: "პერანგი", image: "/perangi.png", href: "/products?category=პერანგი" },
  { id: 6, name: "ქვედაბოლო", image: "/kvedabolo.png", href: "/products?category=ქვედაბოლო" },
  { id: 7, name: "პალტო", image: "/palto.png", href: "/products?category=პალტო" },
  { id: 8, name: "ქურთუკი", image: "/shirt.png", href: "/products?category=ქურთუკი" },
  { id: 9, name: "მაისური", image: "/shirt.png", href: "/products?category=მაისური" },
  { id: 10, name: "პიჯაკი", image: "/shirt.png", href: "/products?category=პიჯაკი" },
  { id: 11, name: "ფრენჩი", image: "/shirt.png", href: "/products?category=ფრენჩი" },
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
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${styles.wrapper} ${loaded ? styles.loaded : ""}`}>
      {canScrollLeft && <button className={styles.button} onClick={scrollLeft}>{"<"}</button>}

      <div ref={scrollRef} className={styles.scrollContainer}>
        {categories.map((cat) => (
          <div key={cat.id} className={styles.slide}>
            <Link href={cat.href || "/products"} style={{ textDecoration: "none" }}>
              <Card hoverable className={`${styles.card} ${cat.dark ? styles.dark : styles.light}`} style={{ padding: 12 }}>
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
            </Link>
          </div>
        ))}
      </div>

      {canScrollRight && <button className={styles.buttontwo} onClick={scrollRight}>{">"}</button>}
    </div>
  );
}
