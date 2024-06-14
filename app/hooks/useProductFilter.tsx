import { useState } from "react";
import { Product } from "../types/product";

const useProductFilter = () => {
  const [filter, setFilter] = useState<string>(""); // Explicitly specify string type for filter

  const handleFilterChange = (value: string) => {
    setFilter(value.toLowerCase().trim()); // Update filter state with input value
  };

  const applyFilter = (products: Product[]): Product[] => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter)
    );
  };

  return {
    filter,
    handleFilterChange,
    applyFilter,
  };
};

export default useProductFilter;
