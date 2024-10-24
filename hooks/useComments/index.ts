import { useQuery } from '@tanstack/react-query'
import { CommentsResponseApiProps } from './types'

const fetchComments = async (postId: string): Promise<CommentsResponseApiProps[]> => {
    const API_BASE_URL = process.env.API_BASE_URL

    const response = await fetch(`${API_BASE_URL}/comments?` + new URLSearchParams({
        postId
    }).toString())

    const data = await response.json()
    return data
}

const useComments = (postId: string) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
        refetchOnWindowFocus: false,
    })
}

export { useComments }
