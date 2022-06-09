import { useEffect, useState } from 'react';

type SizeData = {
	width: number;
	height: number;
};

export const useWindowSize = (): SizeData => {
	const [size, setSize] = useState<SizeData>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const resizeHanlder = () => {
		const width: number = window.innerWidth;
		const height: number = window.innerHeight;
		setSize({
			width,
			height,
		});
	};

	useEffect(() => {
		window.addEventListener('resize', resizeHanlder);
		return () => {
			window.removeEventListener('resize', resizeHanlder);
		};
	}, [size]);

	return {
		width: size.width,
		height: size.height,
	};
};
