
export const filterData = (audioBuffer: AudioBuffer) => {
	const rawData = audioBuffer.getChannelData(0);

	const samples = 150;
	const blockSize = Math.floor(rawData.length / samples);
	const filteredData = [];

	for (let i = 0; i < samples; i++) {
		let blockStart = blockSize * i;

		let sum = 0;
		for (let j = 0; j < blockSize; j++) {
			sum = sum + Math.abs(rawData[blockStart + j]);
		}
		filteredData.push(sum / blockSize);
	}
	return filteredData;
};

export const normalizeData = (filteredData: number[]) => {
	const multiplier = 36 / Math.max(...filteredData);
	// const multiplier = Math.pow(Math.max(...filteredData), -1);
	return filteredData.map((n: number) => Number((n * multiplier + 1).toFixed()));
};
