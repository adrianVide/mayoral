import Image from "next/image";
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
  console.log(product);
  return (
    <ProductContext.Provider value={{ product }}>
      <div className="bg-gray-100 shadow-lg rounded-lg flex items-center justify-center flex-col">
        {children}
      </div>
    </ProductContext.Provider>
  );
};

const CardImage = () => {
  const { product } = useProduct();
  console.log(product);
  return (
    <Image src={product.image} alt={product.name} width={260} height={260} />
  );
};

const CardName = () => {
  const { product } = useProduct();
  return <h2 className="text-xl font-bold">{product.name}</h2>;
};

const CardPrice = () => {
  const { product } = useProduct();
  return <p className="text-gray-500">{product.price}</p>;
};

const CardDiscountPrice = () => {
  const { product } = useProduct();
  return <p className="text-gray-500">{product.discount_price}</p>;
};

Card.Name = CardName;
Card.Price = CardPrice;
Card.Image = CardImage;
Card.DiscountPrice = CardDiscountPrice;

export default Card;
