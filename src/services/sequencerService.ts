let AUDIO = new window.AudioContext();
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
		this.pattern = {
			sequence: {
				openHat: '0101010101010101',
				closedHat: '0000000100000000',
				snare: '1010101010001000',
			},
		};
		this.initialPattern = [
			[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
			[0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
		];
		this.currentInitialPattern = null;
	}

	setTempo() {
		this.tic = 60 / 160 / 4; // 16th
	}

	scheduleNote(context: any) {
		if (!this.isPlaying) return false;
		const _scheduleNote = () => {
			let ct = AUDIO.currentTime;

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
		const s = AUDIO.createBufferSource();
		s.buffer = this.bank[id];

		s.connect(AUDIO.destination);
		s.start(when || 0);
	}

	_parsePattern(pattern: any) {
		this.currentPattern = {};
		this.currentInitialPattern = [];

		if (!this.currentPattern) return;
		// for (let k in this.pattern.sequence) {
		// 	let pat = this._parseLine(pattern.sequence[k]);

		// 	this.currentPattern[k] = pat;
		// }

		for (let k in this.initialPattern) {
			let pat = this.initialPattern[k];
			this.currentInitialPattern[k] = pat;
		}
	}

	// _parseLine(line: any) {
	// 	if (line.length !== 16) console.error('Invalid line length', this.pattern);

	// 	return line.split('');
	// }

	loadSamples(srcObj: any) {
		srcObj.forEach((src: any, index: number) => {
			this._loadSample(index, src);
		});
		// for (var k in srcObj) {
		// 	this.totalCount++;
		// }

		// for (var k in srcObj) {
		// 	// this._loadSample(k, srcObj[k]);
		// }
	}

	async _loadSample(key: any, url: any) {
		const response = await fetch(`${url}`);
		const arrayBuffer = await response.arrayBuffer();

		const data = await AUDIO.decodeAudioData(arrayBuffer);

		this._handleSampleLoad(key, data);
	}

	_handleSampleLoad(key: any, buffer: any) {
		this.bank[key] = buffer;
	}

	onPlay() {
		this.isPlaying = true;
		this.noteTime = 0.0;
		this.startTime = AUDIO.currentTime + 0.005;
		this.scheduleNote(this);
		this.setTempo();
		this._parsePattern(this.pattern);

		let samples: any = {};
		let sampleList = [
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/snare.wav',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/closedHat.wav',
		];
		// sampleList.forEach(function(id) {
		// 	samples[id] = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/' + id + '.wav';
		// });

		this.loadSamples(sampleList);
	}
}

export const sequencerService = new SequencerService();
