"use client";

import React, { useEffect, useState } from "react";
import "./Loading.css";

export default function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll ბლოკირება ჩატვირთვისას
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      // Scroll-ის აღდგენა ჩატვირთვის შემდეგ
      document.body.style.overflow = "auto";
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="container">
      <h1 className="load">CHUPSTORE</h1>
    </div>
  );
}