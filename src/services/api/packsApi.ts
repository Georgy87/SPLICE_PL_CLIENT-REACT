import { instance } from '../../core/axios';

export const packsApi = {
	async createPack(formData: FormData) {
		const { data } = await instance.post('packs/pack', formData);
		return data;
	},

	async getPacks() {
		const { data } = await instance.get('packs');
		return data;
	},

	// async createSamples(formData: FormData) {
	// 	const { data } = await instance.post('packs/samples', formData);
	// },

	async getPack(packId: string) {
		const { data } = await instance.get(`packs/pack?packId=${packId}`);
		return data;
	},

	async getUserPacks() {
		const { data } = await instance.get('packs/user-packs');
		return data;
	},
};
