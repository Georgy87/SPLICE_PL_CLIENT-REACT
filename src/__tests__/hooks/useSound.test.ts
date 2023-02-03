import React from 'react';
import { act, renderHook } from '@testing-library/react';

import { packs } from '@mocks/packsPage';
import { useSound } from '@hooks/useSound';

/**
  * @todo
  * finalize the test, since when calling the mock setPlayerState, the hook does not 
  * update the return values ​​!!! Most likely, you need to emulate the useEffect call in the context provider
*/
const mockAudio = jest.fn().mockImplementation(() => {
  return {
    play: jest.fn(),
    pause: jest.fn(),
    volume: 0,
    currentTime: 0,
    duration: 2223,
  };
});

jest.spyOn(window, 'Audio').mockImplementation(mockAudio);


describe('USE SOUND', () => {
  const mockPlayerState = {
    audioPlayer: new mockAudio(),
    packs,
    isPlaying: false,
    currentTrackIndex: 0,
    currentTrackId: null,
    active: null,
    duration: 12322,
    currentTime: 0,
    packCurrentTime: 0,
    volume: 90,
    percent: 0,
    onload: false,
  };

  const setPlayerState: any = jest.fn();
  let useContextSpy: any;

  beforeEach(() => {
    useContextSpy = jest.spyOn(React, 'useContext').mockReturnValue([mockPlayerState, setPlayerState]);
  });

  afterEach(() => {
    useContextSpy.mockRestore();
  });

  it('should playTrack call play', () => {
    const { result } = renderHook(() => useSound(), { initialProps: mockPlayerState });

    jest.spyOn(window, 'Audio').mockImplementation(mockAudio);

    act(() => {
      result.current.playTrack(0, 'packs');
    });

    expect(mockPlayerState.audioPlayer.play).toHaveBeenCalled();
  });

  it('should change volume', async () => {
    const { result } = renderHook(() => useSound());
    const target = {
      target: { value: 90 },
    };

    const e: typeof target = target;
    act(() => {
      //@ts-ignore
      result.current.changeVolume(e);
    });

    expect(result.current.volume).toBe(target.target.value);
  });

  it('should change currentTime', async () => {
    const mockAudio = {
      play: jest.fn(),
      pause: jest.fn(),
      onloadedmetadata: jest.fn(),
      onplay: jest.fn(),
      onpause: jest.fn(),
    };

    const mockPlayerState = {
      audioPlayer: mockAudio,
      packs,
      isPlaying: false,
      currentTrackIndex: 0,
      currentTrackId: null,
      active: null,
      duration: 32,
      currentTime: 0,
      packCurrentTime: 0,
      volume: 90,
      percent: 0,
      onload: false,
    };

    const { result } = renderHook(() => useSound(), { initialProps: mockPlayerState });

    //@ts-ignore
    jest.spyOn(window, 'Audio').mockImplementation(() => mockAudio);

    const target = {
      target: { value: 222 },
    };
    const e: typeof target = target;

    act(() => {
      //@ts-ignore
      result.current.changeCurrentTime(e);
    });

    expect(result.current.playerState.audioPlayer.currentTime).toBe(4935.06);
  });

  it('should playTrack call play new track', () => {
    const mockAudio = {
      play: jest.fn(),
      pause: jest.fn(),
      onloadedmetadata: jest.fn(),
      onplay: jest.fn(),
      onpause: jest.fn(),
    };

    const mockPlayerState = {
      audioPlayer: mockAudio,
      packs,
      isPlaying: false,
      currentTrackIndex: 0,
      currentTrackId: null,
      active: null,
      duration: 32,
      currentTime: 0,
      packCurrentTime: 0,
      volume: 90,
      percent: 0,
      onload: false,
    };

    const { result } = renderHook(() => useSound(), { initialProps: mockPlayerState });
    //@ts-ignore
    jest.spyOn(window, 'Audio').mockImplementation(() => mockAudio);

    act(() => {
      result.current.playTrack(1, 'packs');
    });

    expect(mockPlayerState.audioPlayer.play).toHaveBeenCalled();

    expect(mockPlayerState.audioPlayer.onloadedmetadata).toBeInstanceOf(Function);
    expect(mockPlayerState.audioPlayer.onplay).toBeInstanceOf(Function);
    expect(mockPlayerState.audioPlayer.onpause).toBeInstanceOf(Function);
  });
});
