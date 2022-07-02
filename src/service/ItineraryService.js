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
    create (userId, data) {
        return client.post(`${userId}/itineraries`, data)
            .then(
                async ({ data, status }) => {
                    const itinerary = await data
                    return { status, itinerary: itinerary.data }
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },
    update (userId, itineraryId, data) {
        return client.put(`${userId}/itineraries/${itineraryId}`, data)
            .then(
                async ({ data, status }) => {
                    const itinerary = await data
                    return { status, itinerary: itinerary.data }
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },
    remove (userId, itineraryId) {
        return client.delete(`${userId}/itineraries/${itineraryId}`)
            .then(
                async ({data}) => {
                    const itineraries = await data
                    return itineraries
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