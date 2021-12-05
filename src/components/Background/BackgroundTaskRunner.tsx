import WebWorker from '../../utils/WebWorker';
import WebWorkerEnabler from '../../utils/WebWorkerEnabler';

const workerInstance = new WebWorkerEnabler(WebWorker);

type WorkerData = {
	audioCoordinatesParse: number[];
	canvas: HTMLCanvasElement | null;
	sampleId: string;
	profileUpdate: boolean | undefined;
};

export const BackgroundTaskRunner = () => {
	//@ts-ignore
	workerInstance.onmessage = (e: any) => {
		console.log('Received response:', e);

	};
	//@ts-ignore
	// workerInstance.postMessage('result', data);
};
