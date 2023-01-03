import { instance } from '../../core/axios';
import { Pack } from '../../store/slices/pack/types';

export const packsApi = {
	async createPack(formData: FormData) {
		const data = await instance.post('packs/pack', formData);
		return data;
	},

	async getPacks(payload: number) {
		const data = await instance.get(`packs?page=${payload}`);
		return data;
	},

	async getPack(packId: string, tag: string | null) {
		const data = await instance.get(
			`packs/pack?packId=${packId}&tag=${tag}`,
		);
		return data;
	},

	async getUserPacks() {
		const data = await instance.get('packs/user-packs');
		return data;
	},

	async searchPacks(search: string) {
		const data = await instance.get(`packs/search-packs?search=${search}`);
		return data;
	},

	async packUpdate(update: boolean, packId: string) {
		await instance.put(`packs/update?update=${update}&packId=${packId}`);
	},
};
