import React from 'react';
import { Pack } from '../../store/types/packs';
import { PackItem } from '../PackItem/PackItem';

import styles from './PacksList.module.scss';

type PacksListProps = {
	packs: Pack[];
};

const PacksList: React.FC<PacksListProps> = ({ packs }) => {
	return (
		<>
			{packs?.map((pack) => (
				<>
					<div className={styles.packCardContainer}>
						<PackItem key={pack._id} pack={pack} id={pack._id} />
					</div>
				</>
			))}
		</>
	);
};

export default PacksList;
