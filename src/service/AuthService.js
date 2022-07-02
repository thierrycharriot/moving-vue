import axios from 'axios'
import ErrorFeedback from '../helpers/classes/ErrorFeedback'


const client = axios.create({
    baseURL: 'http://moving-forward.local/wp-json/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    getToken (credentials) {
        return client.post('jwt-auth/v1/token', credentials)
            .then(
                async ({data}) => {
                    const response = await data
                    return response
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },

    register (credentials) {
        return client.post('wp/v2/users/register', credentials)
            .then (
                async (response) => {
                    return response.status
                }
            )
            .catch(
                ({response}) => {
                    new ErrorFeedback(response, true)
                }
            )
    }
}