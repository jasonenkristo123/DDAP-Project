import api from "@/lib/axios"

export const GetProfileById = async (id: number) => {
    const res = await api.get(`/api/users/${id}/profile`)
    return res.data
}

interface profileData {
    profilePhotoUrl?: string;
    displayName?: string;
    username?: string;
    pronouns?: string;
    bio?: string;
    email?: string;
    instagram?: string;
    linkedin?: string;
}

export const UpdateProfile = async (id: number, data: profileData) => {
    const res = await api.put(`/api/users/${id}/profile`, data)
    return res.data
}