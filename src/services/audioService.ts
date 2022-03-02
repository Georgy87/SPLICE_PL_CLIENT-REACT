class AudioService {
	private filterData(audioBuffer: AudioBuffer) {
		const rawData: Float32Array = audioBuffer.getChannelData(0);
		const samples: number = 550;
		const blockSize: number = Math.floor(rawData.length / samples);
		const filteredData: number[] = [];

		for (let i = 0; i < samples; i++) {
			let blockStart: number = blockSize * i;

			let sum: number = 0;
			for (let j = 0; j < blockSize; j++) {
				sum = sum + Math.abs(rawData[blockStart + j]);
			}
			filteredData.push(sum / blockSize);
		}
		return filteredData;
	}

	private normalizeData(filteredData: number[]) {
		const multiplier: number = 50 / Math.max(...filteredData);
		return filteredData.map((n: number) => +((n * multiplier) + 1).toFixed());
	}

	sampleAudioData(buffer: AudioBuffer) {
		return this.normalizeData(this.filterData(buffer));
	}
}
export const audioService = new AudioService();
