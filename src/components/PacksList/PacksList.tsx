import React from 'react';
import { Pack } from '../../store/types/packs';
import { PackItem } from '../PackItem/PackItem';

type PacksListProps = {
	packs: Pack[];
};

const PacksList: React.FC<PacksListProps> = ({ packs }) => {
	return (
		<div>
			<div>
				{packs.map((pack) => (
					<>
						<div>
							<PackItem
								key={pack._id}
								pack={pack}
								id={pack._id}
							/>
						</div>
					</>
				))}
			</div>
		</div>
	);
};

export default PacksList;
