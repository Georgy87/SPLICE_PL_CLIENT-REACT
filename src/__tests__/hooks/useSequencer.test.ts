import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

import { useSequencer } from '@hooks/useSequencer';

const mockaudioContext = jest.fn().mockImplementation(() => {
  return {
    resume: jest.fn(),
    decodeAudioData: jest.fn(),
    currentTime: 3000,
  };
});

jest.mock('axios');

describe('USE SEQUENCER', () => {
  let audioContextSpy: any;
  beforeEach(() => {
    audioContextSpy = jest.spyOn(window, 'AudioContext').mockImplementation(mockaudioContext);
  });

  afterEach(() => {
    audioContextSpy.mockRestore();
  });

  it('should play sequencer', () => {
    const { result, rerender } = renderHook(() => useSequencer());
    const sampleData = new ArrayBuffer(1);
    (axios.request as jest.Mock).mockResolvedValue({ data: sampleData });
    const spy = jest.spyOn(axios, 'request').mockResolvedValue({ data: sampleData });
    const url = 'https://storage.yandexcloud.net/sample-cloud/SAMPLES-AUDIO/0cc0dec1-6152-4962-ae71-ee49e8fdb928.wav';

    act(() => {
      result.current.sequencerState.AUDIO.resume = mockaudioContext;
      result.current.sequencerState.AUDIO.decodeAudioData = mockaudioContext;
      result.current.onPlay([url]);
      // result.current.sequencerState.AUDIO.decodeAudioData(sampleData);
    });

    const { isPlaying, requestId, sequencerState } = result.current;

    expect(sequencerState.AUDIO.resume).toBeCalled();
    expect(isPlaying).toBe(true);
    expect(requestId).toBe(1);

    /**
     * @todo
     * finalize the test for receiving a response and processing it decodeAudioData
     */
    expect(spy).toHaveBeenCalledWith({
      responseType: 'arraybuffer',
      url,
      method: 'GET',
    });
  });

  it('should stop sequencer', () => {
    const { result } = renderHook(() => useSequencer());

    act(() => {
      result.current.onStop();
    });

    const { isPlaying, requestId } = result.current;
    expect(isPlaying).toBe(false);
    expect(requestId).toBe(0);
  });

  it('should set tempo', () => {
    const { result } = renderHook(() => useSequencer());
    const { setTempo } = result.current;

    act(() => {
      setTempo(120);
    });
    expect(result.current.sequencerState.tic).toBe(0.125);
  });
});
