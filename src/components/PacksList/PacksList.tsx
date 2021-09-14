import React from 'react';
import { Pack } from '../../store/types/packs';
// import { PackItem } from '../PackItem/PackItem';

type PacksListProps = {
	packs: Pack[];
}

const PacksList: React.FC<PacksListProps> = ({ packs }) => {
	
	return (
		<div>
			<div>
				{packs.map((pack) => (
					<>
						<div onClick={() => test(pack._id)}>
							{/* <PackItem key={pack._id} pack={pack} /> */}
						</div>
					</>
				))}
			</div>
		</div>
	);
};

export default PacksList;