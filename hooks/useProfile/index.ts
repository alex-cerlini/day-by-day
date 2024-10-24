import { useQuery } from '@tanstack/react-query'
import { ProfileResponseApiProps } from './types'

const fetchProfile = async (userId: string): Promise<ProfileResponseApiProps> => {
    const API_BASE_URL = process.env.API_BASE_URL

    const response = await fetch(`${API_BASE_URL}/users/${userId}`)

    const data = await response.json()
    return data
}

const useProfile = (userId: string) => {
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: () => fetchProfile(userId),
        refetchOnWindowFocus: false,
    })
}

export { useProfile }
