import axios from 'axios'
import ErrorFeedback from '../helpers/classes/ErrorFeedback'


const client = axios.create({
    baseURL: 'http://moving-forward.local/wp-json/wp/v2/users',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    findAllConversations (id) {
        return client.get(`${id}/messages`)
            .then(
                async ({data}) => {
                    const messages = await data
                    return messages
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },
    send (data) {
        return client.post(`${data.sender_id}/messages`, data)
            .then(
                async ({data, status}) => {
                    const message = await data
                    return {status, message}
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    }
}