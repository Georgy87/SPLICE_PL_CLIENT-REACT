import React from 'react';
import { Pack } from '../../store/types/packs';
import { PackItem } from '../PackItem/PackItem';

import styles from './PacksList.module.scss';
import { useSound } from '../../hooks/useSound';

type PacksListProps = {
	packs: Pack[];
	pageName?: string;
};

const PacksList: React.FC<PacksListProps> = ({ pageName }) => {
	const { packs } = useSound();
	return (
		<>
			{packs?.map((pack: Pack, index: number) => (
				<>
					<div className={styles.packCardContainer}>
						<PackItem
							key={pack._id}
							pack={pack}
							id={pack._id}
							pageName={pageName}
							index={index}
						/>

					</div>
				</>
			))}
		</>
	);
};

export default PacksList;
