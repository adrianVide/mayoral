import Image from "next/image";
import "./Card.css";
import { PropsWithChildren, createContext, useContext } from "react";
import { Product } from "../../types/product";

type ProductContextType = {
  product: Product;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

type CardProps = PropsWithChildren & {
  product: Product;
};

const Card = ({ product, children }: CardProps) => {
  return (
    <ProductContext.Provider value={{ product }}>
      <div className="card-container">{children}</div>
    </ProductContext.Provider>
  );
};

const CardImage = () => {
  const { product } = useProduct();
  return (
    <Image
      priority
      src={product?.image}
      alt={product?.name}
      width={260}
      height={260}
    />
  );
};

const CardName = () => {
  const { product } = useProduct();
  return <h2 className="card-name">{product?.name}</h2>;
};

const CardPrice = () => {
  const { product } = useProduct();
  return (
    <p
      className={`card-price ${
        !!product?.discount_price && "card-price__strike"
      }`}
    >
      {product?.price} €
    </p>
  );
};

const CardDiscountPrice = () => {
  const { product } = useProduct();
  if (!product?.discount_price) return null;
  const discountedDifference = Math.floor(
    ((product?.price - product?.discount_price) / product?.price) * 100
  );
  return (
    <p className="card-discount">
      {product?.discount_price} € (-
      {discountedDifference}%)
    </p>
  );
};

const CardButton = () => {
  return <button className="card-button">AÑADIR</button>;
};

Card.Name = CardName;
Card.Price = CardPrice;
Card.Image = CardImage;
Card.DiscountPrice = CardDiscountPrice;
Card.Button = CardButton;

export default Card;
