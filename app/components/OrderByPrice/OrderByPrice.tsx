type OrderByPriceProps = {
  order: "asc" | "desc";
  onOrderChange: (order: "asc" | "desc") => void;
};

const OrderByPrice: React.FC<OrderByPriceProps> = ({
  order,
  onOrderChange,
}) => {
  return (
    <div className="">
      <button
        aria-role="button"
        onClick={() => onOrderChange("asc")}
        className={`symbol ${order === "asc" && "symbol__active"}`}
      >
        ˄
      </button>
      <button
        aria-role="button"
        onClick={() => onOrderChange("desc")}
        className={`symbol ${order === "desc" && "symbol__active"}`}
      >
        ˅
      </button>
    </div>
  );
};

export default OrderByPrice;
