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
	constructor() {
		this.isPlaying = false;
		this.noteTime = 0;
		this.startTime = 0;
		this.ti = 0;
		this.currentStep = 0;
		this.tempo = 60;
		this.tic = 60 / 60 / 4;
		this.currentPattern = null;
		this.bank = {};
		this.totalCount = 0;
		this.pattern = {
			sequence: {
				openHat: '0101010101010101',
				closedHat: '0000000100000000',
				snare: '1010101010001000',
			},
		};
		this.initialPattern = [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		];
	}

	setTempo() {
		this.tic = 60 / 60 / 4; // 16th
	}

	scheduleNote(context: any) {
        let { noteTime, startTime, playPatternStepAtTime, nextNote, ti } = context;
		if (!this.isPlaying) return false;
		const _scheduleNote = () => {
		
			let ct = AUDIO.currentTime;

			ct -= startTime;

			while (this.noteTime < ct + 0.2) {
				let pt = noteTime + startTime;

				// playPatternStepAtTime(pt);
				// nextNote();
			}
			ti = window.requestAnimationFrame(_scheduleNote);
            console.log(ti)
		};
		_scheduleNote();
	}

	nextNote() {
		this.currentStep++;

		if (this.currentStep == 16) this.currentStep = 0;

		this.noteTime += this.tic;
	}

	playPatternStepAtTime(pt: number) {
		for (let k in this.currentPattern) {
			if (this.currentPattern[k][this.currentStep] == '1') {
				this.playPattern(k, pt);
			}
		}
	}

	playPattern(id: any, when: any) {
		const s = AUDIO.createBufferSource();

		s.buffer = this.bank[id];
		console.log(s.buffer);
		s.connect(AUDIO.destination);
		s.start(when || 0);
	}

	_parsePattern(pattern: any) {
		console.log(pattern);
		this.currentPattern = {};
		if (!this.currentPattern) return;
		for (var k in this.pattern.sequence) {
			var pat = this._parseLine(pattern.sequence[k]);

			this.currentPattern[k] = pat;
		}
	}

	_parseLine(line: any) {
		if (line.length !== 16) console.error('Invalid line length', this.pattern);

		return line.split('');
	}

	loadSamples(srcObj: any) {
		for (var k in srcObj) {
			this.totalCount++;
		}
		for (var k in srcObj) {
			this._loadSample(k, srcObj[k]);
		}
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
		let sampleList = ['snare', 'openHat', 'closedHat'];
		sampleList.forEach(function(id) {
			samples[id] = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/' + id + '.wav';
		});

		this.loadSamples(samples);
	}
}

export const sequencerService = new SequencerService();
