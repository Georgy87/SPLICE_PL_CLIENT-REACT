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

	async getPack(packId: string) {
		const { data } = await instance.get(`packs/pack?packId=${packId}`);
		return data;
	},

	async getUserPacks() {
		const { data } = await instance.get('packs/user-packs');
		return data;
	},

	async searchPacks(search: string) {
		const { data } = await instance.get(`packs/search-packs?search=${search}`);
		return data;
	},

	async packUpdate(update: boolean, packId: string) {
		console.log(update, packId)
		await instance.put(`packs/update?update=${update}&packId=${packId}`);
	},
};
