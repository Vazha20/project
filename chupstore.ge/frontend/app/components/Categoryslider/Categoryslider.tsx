"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import styles from "./Categoryslider.module.css";

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
  objectFit: "cover",
  boxSizing: "border-box",
  margin: "0 auto",
};

const CarouselBox: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.wrapper} ${loaded ? styles.loaded : ""}`}>
      <Carousel autoplay dots={true} infinite>
        <div>
          <img src="/aaaa.jpeg" alt="Slide 1" style={imgStyle} />
        </div>
        <div>
          <img src="/aaaa.jpeg" alt="Slide 2" style={imgStyle} />
        </div>
        <div>
          <img src="/aaaa.jpeg" alt="Slide 3" style={imgStyle} />
        </div>
        <div>
          <img src="/aaaa.jpeg" alt="Slide 4" style={imgStyle} />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselBox;