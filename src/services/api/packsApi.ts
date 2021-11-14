import { instance } from '../../core/axios';

export const packsApi = {
	async createPack(formData: FormData) {
		const { data } = await instance.post('pack', formData);
		return data;
	},

	async getPacks() {
		const { data } = await instance.get('packs');
		return data;
	},

	async createSamples(formData: FormData) {
		const { data } = await instance.post('samples', formData);
	},

	async getPack(packId: string) {
		const { data } = await instance.get(`pack?packId=${packId}`);
		return data;
	},
	
};
