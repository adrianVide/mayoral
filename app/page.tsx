"use client";
import React, { useState } from "react";
import Card from "./components/Card/Card";
import useWindowWidth from "./hooks/useWindowWidth";
import useProductFilter from "./hooks/useProductFilter"; // Import the custom hook
import products from "./HARDCODED/products.json";
import OrderByPrice from "./components/OrderByPrice/OrderByPrice";
import { Product } from "./types/product";

export default function Home() {
  const [desktopColumns, setDesktopColumns] = useState(4);
  const [mobileColumns, setMobileColumns] = useState(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const isDesktop = useWindowWidth();

  const desktopColumnRanges = [4, 5, 6];
  const mobileColumnRanges = [1, 2];

  const { filter, handleFilterChange, applyFilter } = useProductFilter();

  const handleIncrease = () => {
    if (isDesktop) {
      setDesktopColumns((prev) => {
        const nextIndex = desktopColumnRanges.indexOf(prev) + 1;
        return nextIndex < desktopColumnRanges.length
          ? desktopColumnRanges[nextIndex]
          : desktopColumnRanges[desktopColumnRanges.length - 1];
      });
    } else {
      setMobileColumns((prev) => {
        const nextIndex = mobileColumnRanges.indexOf(prev) + 1;
        return nextIndex < mobileColumnRanges.length
          ? mobileColumnRanges[nextIndex]
          : mobileColumnRanges[mobileColumnRanges.length - 1];
      });
    }
  };

  const handleDecrease = () => {
    if (isDesktop) {
      setDesktopColumns((prev) => {
        const nextIndex = desktopColumnRanges.indexOf(prev) - 1;
        return nextIndex >= 0
          ? desktopColumnRanges[nextIndex]
          : desktopColumnRanges[0];
      });
    } else {
      setMobileColumns((prev) => {
        const nextIndex = mobileColumnRanges.indexOf(prev) - 1;
        return nextIndex >= 0
          ? mobileColumnRanges[nextIndex]
          : mobileColumnRanges[0];
      });
    }
  };

  const handleOrderChange = (newOrder: "asc" | "desc") => {
    setOrder(newOrder);
  };

  const getGridTemplateColumns = () => {
    return isDesktop
      ? `repeat(${desktopColumns}, minmax(0, 1fr))`
      : `repeat(${mobileColumns}, minmax(0, 1fr))`;
  };

  const applyOrder = (products: Product[]): Product[] => {
    return [...products].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
  };

  return (
    <main>
      <div className="header-container">
        <input
          type="text"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder="🔍 Buscar"
          className="input-search"
        />
        <div className="symbols-container">
          <button
            onClick={handleDecrease}
            className="symbol"
          >
            -
          </button>
          <button
            onClick={handleIncrease}
            className="symbol"
          >
            +
          </button>
          <OrderByPrice order={order} onOrderChange={handleOrderChange} />
        </div>
      </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: getGridTemplateColumns() }}
      >
        {applyOrder(applyFilter(products)).map((product) => (
          <Card key={product.id} product={product}>
            <Card.Image />
            <Card.Name />
            <Card.Price />
            <Card.DiscountPrice />
            <Card.Button />
          </Card>
        ))}
      </div>
    </main>
  );
}
