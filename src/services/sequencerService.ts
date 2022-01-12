	
class SequencerService {
	isPlaying: any;
	noteTime: any;
	startTime: any;
	ti: any;
	currentStep: any;
	tempo: any;
	tic: any;
	currentPattern: any;
	bank: any;
	totalCount: any;
	pattern: any;
	initialPattern: any;
	currentInitialPattern: any;
	AUDIO: any;
	constructor() {
		this.isPlaying = false;
		this.noteTime = 0;
		this.startTime = 0;
		this.ti = 0;
		this.currentStep = 0;
		this.tempo = 160;
		this.tic = 60 / 160 / 4;
		this.currentPattern = null;
		this.bank = [];
		this.totalCount = 0;
		this.initialPattern = [
			[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
			[0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
		];
		this.currentInitialPattern = null;
		this.AUDIO = new window.AudioContext();
	}

	setTempo() {
		this.tic = 60 / 120 / 4;
	}

	scheduleNote(context: any) {
		if (!this.isPlaying) return false;
		const _scheduleNote = () => {
			let ct = this.AUDIO.currentTime;

			ct -= context.startTime;

			while (context.noteTime < ct + 0.2) {
				let pt = context.noteTime + context.startTime;

				context.playPatternStepAtTime(pt);
				context.nextNote();
			}

			context.ti = window.requestAnimationFrame(_scheduleNote);
		};
		_scheduleNote();
	}

	nextNote() {
		this.currentStep++;

		if (this.currentStep == 16) this.currentStep = 0;
		this.noteTime += this.tic;
	}

	playPatternStepAtTime(pt: number) {
		for (let k in this.currentInitialPattern) {
			if (this.currentInitialPattern[k][this.currentStep] === 1) {
				this.playPattern(k, pt);
			}
		}
	}

	playPattern(id: any, when: any) {
		console.log(this.bank, when);
		const s = this.AUDIO.createBufferSource();
		s.buffer = this.bank[id];

		s.connect(this.AUDIO.destination);
		s.start(when || 0);
	}

	_parsePattern(pattern: any) {
		this.currentInitialPattern = [];

		for (let k in this.initialPattern) {
			let pat = this.initialPattern[k];
			this.currentInitialPattern[k] = pat;
		}
	}

	loadSamples(srcObj: string[]) {
		srcObj.forEach((src: string, index: number) => {
			this._loadSample(index, src);
		});
	}

	async _loadSample(key: any, url: any) {
		const response = await fetch(`${url}`);
		const arrayBuffer = await response.arrayBuffer();

		const data = await this.AUDIO.decodeAudioData(arrayBuffer);

		this._handleSampleLoad(key, data);
	}

	_handleSampleLoad(key: any, buffer: any) {
		this.bank[key] = buffer;
	}

	onPlay() {
		this.isPlaying = true;
		this.noteTime = 0.0;
		this.startTime = this.AUDIO.currentTime + 0.005;
		this.scheduleNote(this);
		this.setTempo();
		this._parsePattern(this.pattern);

		let sampleList = [
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/snare.wav',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/closedHat.wav',
		];

		this.loadSamples(sampleList);
	}

	onStop() {
		this.isPlaying = false;
		this.currentStep = 0;
		cancelAnimationFrame(this.ti);
	}
}

export const sequencerService = new SequencerService();
