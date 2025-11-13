"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  mainImage?: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "ყველა"
  );
  const [sortOrder, setSortOrder] = useState<string>(
    searchParams.get("sort") || "none"
  );
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const productsPerPage = 9;

  // Backend-დან პროდუქტების წამოღება
  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const updatedData = data
          .map((p) => ({
            ...p,
            mainImage: p.mainImage
              ? p.mainImage.startsWith("http")
                ? p.mainImage
                : `http://localhost:3001${p.mainImage}`
              : undefined,
          }))
          .sort((a, b) => b.id - a.id);

        setProducts(updatedData);
        setFilteredProducts(updatedData);

        const uniqueCategories = Array.from(
          new Set(updatedData.map((p) => p.category))
        );
        setCategories(["ყველა", ...uniqueCategories]);
      })
      .catch(console.error);
  }, []);

  // Window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sorting & filtering
  useEffect(() => {
    let tempProducts = [...products];

    if (selectedCategory !== "ყველა") {
      tempProducts = tempProducts.filter((p) => p.category === selectedCategory);
    }

    if (sortOrder === "asc") tempProducts.sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc") tempProducts.sort((a, b) => b.price - a.price);

    setFilteredProducts(tempProducts);
    setCurrentPage(1);

    // URL-ის განახლება
    const params = new URLSearchParams();
    if (selectedCategory !== "ყველა") params.set("category", selectedCategory);
    if (sortOrder !== "none") params.set("sort", sortOrder);
    params.set("page", "1");
    router.replace(`/products?${params.toString()}`);
  }, [selectedCategory, sortOrder, products, router]);

  // Pagination update URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "ყველა") params.set("category", selectedCategory);
    if (sortOrder !== "none") params.set("sort", sortOrder);
    params.set("page", currentPage.toString());
    router.replace(`/products?${params.toString()}`);
  }, [currentPage, selectedCategory, sortOrder, router]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const renderFilters = () => (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid #000000ff",
          background: "#fff",
          cursor: "pointer",
          fontWeight: "500",
          transition: "0.2s",
        }}
      >
        <option value="none">სორტირება</option>
        <option value="desc">ფასი კლებადობით</option>
        <option value="asc">ფასი ზრდადობით</option>
      </select>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid #000000ff",
          background: "#fff",
          cursor: "pointer",
          fontWeight: "500",
          transition: "0.2s",
        }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );

  const getGridColumns = () => {
    if (windowWidth >= 1180) return "repeat(3, 1fr)";
    if (windowWidth >= 1024) return "repeat(2, 1fr)";
    if (windowWidth >= 768) return "repeat(2, 1fr)";
    if (windowWidth >= 480) return "repeat(2, 1fr)";
    return "repeat(1, 1fr)";
  };

  return (
    <div style={{ maxWidth: "1320px", padding: "40px 30px", margin: "0 auto", minHeight: "70vh" }}>
      <div style={{ display: "flex", gap: "30px", flexWrap: windowWidth <= 1024 ? "wrap" : "nowrap" }}>
        {/* Desktop Sidebar */}
        {windowWidth > 1024 && (
          <div
            style={{
              minWidth: "300px",
              padding: "20px",
              borderRadius: "16px",
              background: "linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "sticky",
              top: "20px",
              height: "fit-content",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #000000ff",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "0.2s",
                }}
              >
                <option value="none">სორტირება</option>
                <option value="desc">კლებადობით</option>
                <option value="asc">ზრდადობით</option>
              </select>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  marginBottom: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#111",
                }}
              >
                კატეგორიები
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: selectedCategory === cat ? "2px solid #000000ff" : "1px solid #eee",
                        background: selectedCategory === cat ? "#e6f7ff" : "#f8f9fa",
                        cursor: "pointer",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Products Column */}
        <div style={{ flex: 1 }}>
          {/* Mobile filters */}
          {windowWidth <= 1024 && renderFilters()}

          <div style={{ display: "grid", gridTemplateColumns: getGridColumns(), gap: "20px" }}>
            {currentProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  className="product-card"
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "360px",
                  }}
                >
                  <div>
                    {p.mainImage && (
                      <img
                        src={p.mainImage}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "contain",
                          borderRadius: "8px",
                          marginBottom: "15px",
                        }}
                      />
                    )}
                    <h3 style={{ marginBottom: "10px" }}>{p.name}</h3>
                    <p style={{ marginBottom: "10px", color: "#555" }}>
                      {p.description.slice(0, 20) + "..."}
                    </p>
                  </div>
                  <strong style={{ fontSize: "16px", color: "#000", display: "flex", justifyContent: "end" }}>
                    {p.price} ₾
                  </strong>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                style={{
                  margin: "0 5px",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  border: currentPage === num ? "2px solid #000000ff" : "1px solid #ddd",
                  background: currentPage === num ? "#ffffffff" : "#fff",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
