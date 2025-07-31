import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com'

export const fetchPost = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`)
        return response.data
    }catch(err) {
        console.error('Error fetching posts:', error.message);
    throw new Error('Failed to fetch posts from API');
    }
}