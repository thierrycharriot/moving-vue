import axios from 'axios'
import ErrorFeedback from '../helpers/classes/ErrorFeedback'


const client = axios.create({
    baseURL: 'http://moving-forward.local/wp-json/wp/v2/users/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    findAll (userId) {
        return client.get(`${userId}/deliveries`)
            .then(
                async ({data}) => {
                    const deliveries = await data
                    return deliveries
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },
    create (userId, data) {
        return client.post(`${userId}/deliveries`, data)
            .then(
                async ({ data, status }) => {
                    const delivery = await data
                    return { status, delivery: delivery.data }
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },
    attach (userId, deliveryId, attachmentId) {
        return client.put(`${userId}/deliveries/${deliveryId}/attachment/${attachmentId}`)
            .then(
                async ({ data, status }) => {
                    const delivery = await data
                    return { status, delivery: delivery.data }
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },
    update (userId, deliveryId, data) {
        return client.put(`${userId}/deliveries/${deliveryId}`, data)
            .then(
                async ({ data, status }) => {
                    const delivery = await data
                    return { status, delivery: delivery.data }
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },
    remove (userId, deliveryId) {
        return client.delete(`${userId}/deliveries/${deliveryId}`)
            .then(
                async ({data}) => {
                    const deliveries = await data
                    return deliveries
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