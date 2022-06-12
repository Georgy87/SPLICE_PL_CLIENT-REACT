import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
// Setup Worker

class Worker {
	url: string;
	onmessage: (msg: string) => void;
	addEventListener: (e: unknown) => void;
	removeEventListener: (e: unknown) => void;
	constructor(url: string) {
		this.url = url;
		this.onmessage = () => { };
		this.addEventListener = () => { };
		this.removeEventListener = () => { };
	}

	postMessage(msg: string) {
		this.onmessage(msg);
	}
}

function noOp() { }
if (typeof window.URL.createObjectURL === 'undefined') {
	Object.defineProperty(window.URL, 'createObjectURL', { value: noOp })
}
//@ts-ignore
window.Worker = Worker;

// Setup AudioContext

Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
	set: () => { },
});

window.AudioContext = jest.fn().mockImplementation(() => {
	return {}
});

// Setup IntersectionObserver

class IntersectionObserver {
	observe = jest.fn()
	disconnect = jest.fn()
	unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: IntersectionObserver,
})

// React 17 Enzyme adapter

Enzyme.configure({ adapter: new Adapter() });

//@ts-ignore
global.shallow = shallow;
//@ts-ignore
global.render = render;
//@ts-ignore
global.mount = mount;
//@ts-ignore
global.toJson = toJson;
import '@testing-library/jest-dom';
