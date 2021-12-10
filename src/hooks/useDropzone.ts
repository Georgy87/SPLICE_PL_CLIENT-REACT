import { useState } from 'react';

export const useDropzone = () => {
	const [drag, setDrag] = useState<boolean>(false);

	const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDrag(true);
	};

	const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDrag(false);
	};

	return {
		dragEnter,
		dragLeave,
		setDrag,
		drag,
	};
};
