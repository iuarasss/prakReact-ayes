import axios from 'axios'

const API_URL = "https://urkxvtqhexqwljmfencv.supabase.co/rest/v1/note"
const API_KEY = "sb_publishable_F3w_UqMz_Z8oi0B6RP6-Uw_y2_mK8vh"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    async deleteNote(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }
}