"use client";

import React, { useEffect, useState } from "react";
import "./Loading.css";

export default function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="container">
      <h1 className="load">CHUPSTORE</h1>
    </div>
  );
}
