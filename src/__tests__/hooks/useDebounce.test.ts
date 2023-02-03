import { renderHook } from '@testing-library/react';

import { useDebounce } from '@hooks/useDebounce';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('USE SOUND', () => {
  it('should call the callback with the latest argument', () => {
    const callback = jest.fn((value) => value);
    const { result } = renderHook(() => useDebounce(callback, 500));
    const { debouncedCallback } = result.current;

    act(() => {
      debouncedCallback('r');
      debouncedCallback('ra');
      debouncedCallback('rap');
    });

    jest.advanceTimersByTime(499);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledWith('rap');
  });
});
