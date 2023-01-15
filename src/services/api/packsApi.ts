import { instance } from '@core/axios';
import { Pack, PackProfile } from '@slices/pack/types';

export const packsApi = {
    async createPack(formData: FormData) {
        const { data } = await instance.post<Pack[]>('packs/pack', formData);
        return data;
    },

    async getPacks(payload: number) {
        const { data } = await instance.get<{ packs: Pack; totalPage: number }>(`packs?page=${payload}`);
        return data;
    },

    async getPack(packId: string, tag: string | null) {
        const { data } = await instance.get<PackProfile>(`packs/pack?packId=${packId}&tag=${tag}`);
        return data;
    },

    async getUserPacks() {
        const { data } = await instance.get<Pack[]>('packs/user-packs');
        return data;
    },

    async searchPacks(search: string) {
        const { data } = await instance.get<Pack[]>(`packs/search-packs?search=${search}`);
        return data;
    },

    async packUpdate(update: boolean, packId: string) {
        await instance.put(`packs/update?update=${update}&packId=${packId}`);
    },
};
