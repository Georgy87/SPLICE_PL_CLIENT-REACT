import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectSamplesFiles } from '../../store/selectors/samplesSelectors';
import { sendFileImages } from '../../utils/sendFileImages';
import WebWorker from '../../utils/WebWorker';
import WebWorkerEnabler from '../../utils/WebWorkerEnabler';

const workerInstance = new WebWorkerEnabler(WebWorker);

type PropsType = {
	file: File;
};

export const Canvas: React.FC<PropsType> = ({ file }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef?.current) {
            const offscreen: any = canvasRef?.current.transferControlToOffscreen();
            //@ts-ignore
            workerInstance.postMessage(
                {
                    canvas: offscreen,
                    files: file,
                    cssCanvasWidth: 550,
                    cssCanvasHeight: 50,
                    dpr: 2,
                },
                [offscreen],
            );
    
            //@ts-ignore
            workerInstance.addEventListener('message', (e: any) => {
                const { file, sampleId, profileUpdate } = e.data;
                sendFileImages(file, profileUpdate, sampleId);
            });
        }
    
    }, [canvasRef.current])

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
