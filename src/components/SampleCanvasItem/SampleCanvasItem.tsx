import { useEffect, useRef, FC } from 'react';
import { useSelector } from 'react-redux';

import { selectPackId } from '@selectors/samplesSelectors';
import { audioService } from '@services/audioService';
import { workerInstanceCreateSample } from '@workers/WebWorkerEnabler';
import { canvasSampleService } from '@services/canvasSampleService';
import { deleteSampleFiles } from '@slices/samples/samplesSlice';
import { createSamples } from '@utils/createSamples';
import { detectBrowser } from '@utils/detectBrowser';
import { useAppDispatch } from '@store/types';

type PropsType = {
  file: File;
  fileId: string;
};

export const Canvas: FC<PropsType> = ({ file, fileId }) => {
  const packId = useSelector(selectPackId);

  const browser = detectBrowser();

  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reader: FileReader = new FileReader();
    const audioContext = new AudioContext();
    reader.readAsArrayBuffer(file);
    window.AudioContext = window.AudioContext || new window.webkitAudioContext();

    reader.onload = async function () {
      const arrayBuffer: any = reader.result;
      if (!arrayBuffer) return;
      const buffer: AudioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const audioCoordinates: any = audioService.sampleAudioData(buffer);

      if (browser === 'Safari') {
        const canvas = canvasRef?.current;
        const dataToSampleCreate = canvasSampleService.drawingCanvasToImage(
          file,
          audioCoordinates,
          packId,
          canvas,
          fileId,
          buffer.duration,
        );

        if (!dataToSampleCreate) return;

        const id = await createSamples(dataToSampleCreate);
        if (!id) return;
        dispatch(deleteSampleFiles(id));
      }

      if (!canvasRef?.current) return;
      const offscreen = canvasRef?.current.transferControlToOffscreen();
      workerInstanceCreateSample.postMessage(
        {
          audioFile: file,
          audioCoordinates,
          packId,
          canvas: offscreen,
          cssCanvasWidth: 550,
          cssCanvasHeight: 50,
          dpr: 2,
          fileId,
          duration: buffer.duration,
        },
        [offscreen],
      );
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          width: '550px',
          height: '35px',
        }}
      />
    </>
  );
};
