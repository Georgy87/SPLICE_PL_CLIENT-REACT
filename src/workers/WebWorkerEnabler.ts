
import CreateSampleWebWorker from "./CreateSampleWebWorker";
import SampleViewWebWorker from "./SampleViewWebWorker";

export default class WebWorkerEnabler {
	constructor(worker: any) {
		let code = worker.toString();
		code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

		const blob = new Blob([code], { type: 'application/javascript' });
	
		return new Worker(URL.createObjectURL(blob));
	}
}

export const workerInstanceCreateSample: any = new WebWorkerEnabler(CreateSampleWebWorker);
export const workerInstanceViewSample: any = new WebWorkerEnabler(SampleViewWebWorker);
