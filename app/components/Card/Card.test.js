import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

const mockProduct = {
    id: '1',
    name: 'Mock Product',
    image: '/mock-image.jpg',
    price: 20,
    discount_price: 15,
};

const ProductContext = React.createContext({
    product: mockProduct,
});

const ProductProvider = ({ children }) => {
    return (
        <ProductContext.Provider value={{ product: mockProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};

describe('Card Component', () => {
    it('renders Card component with correct product details', () => {
        render(
            <ProductProvider>
                <Card product={mockProduct}>
                    <Card.Image />
                    <Card.Name />
                    <Card.Price />
                    <Card.DiscountPrice />
                    <Card.Button />
                </Card>
            </ProductProvider>
        );

        expect(screen.getByAltText('Mock Product')).toBeInTheDocument();
        expect(screen.getByText('Mock Product')).toBeInTheDocument();
        expect(screen.getByText(`20 €`)).toBeInTheDocument();
        expect(screen.getByText(`15 € (-25%)`)).toBeInTheDocument();
        expect(screen.getByText('AÑADIR')).toBeInTheDocument();
    });

    it('uses ProductContext and renders components correctly', () => {
        const TestComponent = () => {
            const { product } = useProduct();
            return (
                <div>
                    <span data-testid="product-name">{product.name}</span>
                    <span data-testid="product-price">{product.price}</span>
                </div>
            );
        };

        render(
            <ProductProvider>
                <TestComponent />
            </ProductProvider>
        );

        expect(screen.getByTestId('product-name')).toHaveTextContent(mockProduct.name);
        expect(screen.getByTestId('product-price')).toHaveTextContent(mockProduct.price.toString());
    });
});
