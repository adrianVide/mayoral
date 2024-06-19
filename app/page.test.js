import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './page';

describe('Home Component', () => {
    const mockProducts = [
        { id: 1, name: 'Camiseta Niño Blanca', price: 14 },
        { id: 2, name: 'Camiseta Niño Amarilla', price: 15 },
        { id: 3, name: 'Camiseta Niño Verde', price: 15.5 },
        { id: 4, name: 'Camiseta Niño Roja', price: 16 },
    ];

    jest.mock('./hooks/useWindowWidth', () => () => true);

    beforeEach(() => {
        render(<Home />);
    });

    it('should render search input with placeholder', () => {
        const searchInput = screen.getByPlaceholderText('🔍 Buscar');
        expect(searchInput).toBeInTheDocument();
    });

    it('should render buttons to increase and decrease columns', () => {
        const decreaseButton = screen.getByText('-');
        const increaseButton = screen.getByText('+');

        expect(decreaseButton).toBeInTheDocument();
        expect(increaseButton).toBeInTheDocument();
    });

    it('should render products grid with initial layout', () => {
        const grid = screen.getByRole('main').querySelector('.grid');
        expect(grid).toHaveStyle('grid-template-columns: repeat(4, minmax(0, 1fr))');
    });

    it('should apply sorting by price in ascending order by default', () => {
        const sortedProducts = mockProducts.slice().sort((a, b) => a.price - b.price);

        const productNames = sortedProducts.map(product => product.name);
        const productElements = productNames.map(name => screen.getByText(name));

        expect(productElements).toHaveLength(sortedProducts.length);

        productElements.forEach((element, index) => {
            expect(element).toHaveTextContent(sortedProducts[index].name);
            expect(element.nextSibling).toHaveTextContent(`${sortedProducts[index].price} €`);
        });
    });

    it('should filter products when typing in search input', () => {
        const searchInput = screen.getByPlaceholderText('🔍 Buscar');

        fireEvent.change(searchInput, { target: { value: 'Camiseta Niño Blanca' } });

        const filteredProduct = screen.queryByText('Camiseta Niño Blanca');

        const nonFilteredProduct = screen.queryByText('Camiseta Niño Amarilla');

        expect(filteredProduct).toBeInTheDocument();
        expect(nonFilteredProduct).not.toBeInTheDocument();
    });

    it('should change column layout on button click', () => {
        const decreaseButton = screen.getByText('-');
        const increaseButton = screen.getByText('+');

        let grid = screen.getByRole('main').querySelector('.grid');
        expect(grid).toHaveStyle('grid-template-columns: repeat(4, minmax(0, 1fr))');

        fireEvent.click(decreaseButton);

        grid = screen.getByRole('main').querySelector('.grid');
        expect(grid).toHaveStyle('grid-template-columns: repeat(4, minmax(0, 1fr))');

        fireEvent.click(increaseButton);

        grid = screen.getByRole('main').querySelector('.grid');
        expect(grid).toHaveStyle('grid-template-columns: repeat(5, minmax(0, 1fr))');

        fireEvent.click(increaseButton);

        grid = screen.getByRole('main').querySelector('.grid');
        expect(grid).toHaveStyle('grid-template-columns: repeat(6, minmax(0, 1fr))');

        fireEvent.click(decreaseButton);

        grid = screen.getByRole('main').querySelector('.grid');
        expect(grid).toHaveStyle('grid-template-columns: repeat(5, minmax(0, 1fr))');
    });
});
