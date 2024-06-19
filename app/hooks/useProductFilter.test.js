import { act } from 'react'
import { renderHook } from '@testing-library/react-hooks';
import useProductFilter from './useProductFilter';

describe('useProductFilter', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it('should initialize with an empty filter', () => {
        const { result } = renderHook(() => useProductFilter(), { container });
        expect(result.current.filter).toBe('');
    });

    it('should update filter correctly on handleFilterChange', () => {
        const { result } = renderHook(() => useProductFilter(), { container });

        act(() => {
            result.current.handleFilterChange(' Test ');
        });

        expect(result.current.filter).toBe('test');
    });

    it('should apply filter correctly', () => {
        const products = [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Banana' },
            { id: 3, name: 'Grapes' },
        ];

        const { result } = renderHook(() => useProductFilter(), { container });

        act(() => {
            result.current.handleFilterChange('ap');
        });

        const filteredProducts = result.current.applyFilter(products);
        expect(filteredProducts).toEqual([
            { id: 1, name: 'Apple' },
            { id: 3, name: 'Grapes' },
        ]);
    });

    it('should return an empty array if no products match the filter', () => {
        const products = [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Banana' },
            { id: 3, name: 'Grapes' },
        ];

        const { result } = renderHook(() => useProductFilter(), { container });

        act(() => {
            result.current.handleFilterChange('xyz');
        });

        const filteredProducts = result.current.applyFilter(products);
        expect(filteredProducts).toEqual([]);
    });

    it('should return all products if filter is empty', () => {
        const products = [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Banana' },
            { id: 3, name: 'Grapes' },
        ];

        const { result } = renderHook(() => useProductFilter(), { container });

        const filteredProducts = result.current.applyFilter(products);
        expect(filteredProducts).toEqual(products);
    });
});
