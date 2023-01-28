import React from 'react';

import { packs } from '@mocks/packsPage';
import { useSound } from '@hooks/useSound';
import { act, renderHook } from '@testing-library/react';

import { mockAudio } from '@/setupTests';

describe('USE SOUND', () => {
  const mockPlayerState = {
    audioPlayer: new mockAudio(),
    packs,
    isPlaying: false,
    currentTrackIndex: 0,
    currentTrackId: null,
    active: null,
    duration: 0,
    currentTime: 0,
    packCurrentTime: 0,
    volume: 90,
    percent: 0,
    onload: false,
  };

  const setPlayerState: any = jest.fn();
  let useContextSpy: any;

  beforeEach(() => {
    jest.useFakeTimers();
    useContextSpy = jest.spyOn(React, 'useContext').mockReturnValue([mockPlayerState, setPlayerState]);
  });

  afterEach(() => {
    useContextSpy.mockRestore();
  });

  it('play should set isPlaying to true', () => {
    const { result } = renderHook(() => useSound());

    act(() => {
      result.current.playTrack(1, 'packs');
    });

    // expect(mockPlayerState.audioPlayer.onloadedmetadata).(true);

    expect(mockPlayerState.audioPlayer.onloadedmetadata).toBeInstanceOf(Function);
    expect(mockPlayerState.audioPlayer.onplay).toBeInstanceOf(Function);
    expect(mockPlayerState.audioPlayer.onpause).toBeInstanceOf(Function);
    expect(mockPlayerState.audioPlayer.onloadedmetadata).toEqual(expect.any(Function));
  
    // expect(mockPlayerState.audioPlayer.play).toHaveBeenCalled();
    // expect(setPlayerState).toHaveBeenCalledWith((state: PlayerStateType) => ({
    //     ...state,
    //     isPlaying: true,
    // }));
    // expect(mockPlayerState.isPlaying).toBe(true);
    // console.log(mockPlayerState.packs, result.current.isPlaying);
    // expect(setPlayerState).toBeCalled();
    // expect(mockPlayerState.isPlaying).toBe(true);

    // expect(setPlayerState).toHaveBeenCalledWith((state: PlayerStateType) => ({
    //     ...state,
    //     isPlaying: true,
    //   }));
    //   expect(mockPlayerState.isPlaying).toBe(true);
    //   jest.runAllTimers();
  });

  // it('should change volume', async () => {
  //     const { result, rerender } = renderHook(() => useSound());

  //     const e = {
  //         target: { value: '24' },
  //     };

  //     act(() => {
  //         //@ts-ignore
  //         result.current.changeVolume(e);
  //     });

  //     //@ts-ignore
  //     // expect(result.current.volume).toHaveBeenCalled();

  //     // console.log(mockPlayerState.volume);
  // });

  // it('should test', async () => {
  //     const { result, unmount, rerender } = renderHook(() => useSound());

  //     const e = {
  //         target: { value: '222' },
  //     };

  //     act(() => {
  //         //@ts-ignore
  //         result.current.changeCurrentTime(e);
  //     });
  // });
});
