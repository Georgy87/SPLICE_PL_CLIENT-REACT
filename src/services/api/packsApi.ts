import axios from "axios";

export const packsApi = {
    async createPack(formData: FormData) {
        await axios.post('http://localhost:5000/api/pack', formData);
    },

    async getPacks() {
        const { data } = await axios.get('http://localhost:5000/api/pack');
        return data;
    }
}