import { useQuery } from '@tanstack/react-query'
import { PostsResponseApiProps } from './types'

const fetchPosts = async (userId?: string): Promise<PostsResponseApiProps[]> => {
    const API_BASE_URL = process.env.API_BASE_URL

    const userIdQuery = userId ? `?userId=${userId}` : ''

    const response = await fetch(`${API_BASE_URL}/posts/${userIdQuery}`)

    const data = await response.json()
    return data
}

const usePosts = (userId?: string) => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(userId),
        staleTime: 1000 * 60 * 24,
        refetchOnWindowFocus: false,
    })
}

export { usePosts }
