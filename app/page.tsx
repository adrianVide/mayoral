'use client'
import React, { useState } from "react";
import Card from "./components/Card/Card";
import useWindowWidth from "./hooks/useWindowWidth";
import useProductFilter from "./hooks/useProductFilter"; // Import the custom hook
import products from "./HARDCODED/products.json";

export default function Home() {
  const [desktopColumns, setDesktopColumns] = useState(4);
  const [mobileColumns, setMobileColumns] = useState(1);
  const isDesktop = useWindowWidth();

  const desktopColumnRanges = [4, 5, 6]; // Columns for desktop: 4, 5, 6
  const mobileColumnRanges = [1, 2, 3]; // Columns for mobile: 1, 2, 3

  const { filter, handleFilterChange, applyFilter } = useProductFilter(products);

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
        return nextIndex >= 0 ? desktopColumnRanges[nextIndex] : desktopColumnRanges[0];
      });
    } else {
      setMobileColumns((prev) => {
        const nextIndex = mobileColumnRanges.indexOf(prev) - 1;
        return nextIndex >= 0 ? mobileColumnRanges[nextIndex] : mobileColumnRanges[0];
      });
    }
  };

  const getGridTemplateColumns = () => {
    return isDesktop
      ? `repeat(${desktopColumns}, minmax(0, 1fr))`
      : `repeat(${mobileColumns}, minmax(0, 1fr))`;
  };

  return (
    <main className="p-4">
      <div className="flex justify-center space-x-4 mb-4">
        <input
          type="text"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          placeholder="Filter by product name"
          className="bg-gray-200 px-4 py-2 rounded-md"
        />
        <button
          onClick={handleDecrease}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          -
        </button>
        <button
          onClick={handleIncrease}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          +
        </button>
      </div>
      <div
        className="grid"
        style={{ gridTemplateColumns: getGridTemplateColumns() }}
      >
        {applyFilter(products).map((product) => (
          <Card key={product.id} product={product}>
            <Card.Image />
            <Card.Name />
            <Card.Price />
            <Card.DiscountPrice />
          </Card>
        ))}
      </div>
    </main>
  );
}

