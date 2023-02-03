import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useWindowSize } from '@hooks/useWindowSize';

describe('USE SOUND', () => {
  it('should update the window size when the window is resized', () => {
    const { result } = renderHook(() => useWindowSize());
    const initialWidth: number = result.current.width;
    const initialHeight: number = result.current.height;

    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 600;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(600);

    window.innerWidth = initialWidth;
    window.innerHeight = initialHeight;
  });
});
