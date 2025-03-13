import axios from 'axios';

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'KVA/2025'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class MovieService {
    static async getMovies() {
        return client.request({
            url: '/movie',
            method: 'GET',
            params: {
                'sort': 'scheduledAt,asc',
                'type': 'departure'
            }
        })
    }

    static async getMovieById(id: number) {
        return client.get(`/movie/${id}`)
    }

    static async getFlightList() {
        return client.request({
            url: '/flight/list',
            method: 'GET',
            params: {
                'type': 'departure'
            }
        })
    }

    static async getDestinations() {
        return client.get('/flight/destination')
    }
}