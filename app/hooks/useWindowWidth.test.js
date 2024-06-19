import { renderHook, act } from '@testing-library/react-hooks';
import useWindowWidth from './useWindowWidth';

describe('useWindowWidth', () => {
    const resizeWindow = (width) => {
        window.innerWidth = width;
        window.dispatchEvent(new Event('resize'));
    };

    it('should return true if window width is initially >= 1024', () => {
        window.innerWidth = 1024;
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current).toBe(true);
    });

    it('should return false if window width is initially < 1024', () => {
        window.innerWidth = 1023;
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current).toBe(false);
    });

    it('should update to true when window is resized to >= 1024', () => {
        window.innerWidth = 1023;
        const { result } = renderHook(() => useWindowWidth());

        act(() => {
            resizeWindow(1024);
        });

        expect(result.current).toBe(true);
    });

    it('should update to false when window is resized to < 1024', () => {
        window.innerWidth = 1024;
        const { result } = renderHook(() => useWindowWidth());

        act(() => {
            resizeWindow(1023);
        });

        expect(result.current).toBe(false);
    });
});
