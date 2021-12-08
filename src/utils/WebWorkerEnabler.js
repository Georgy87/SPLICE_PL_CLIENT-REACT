import WebWorker from "./WebWorker";
import WebWorkerViewSample from "./WebWorkerViewSample";

export default class WebWorkerEnabler {
	constructor(worker) {
		let code = worker.toString();
		code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

		const blob = new Blob([code], { type: 'application/javascript' });
		return new Worker(URL.createObjectURL(blob));
	}
}

export const workerInstance = new WebWorkerEnabler(WebWorker);
export const workerInstanceSamplePage = new WebWorkerEnabler(WebWorkerViewSample);
