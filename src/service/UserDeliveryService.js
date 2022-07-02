import axios from 'axios'
import ErrorFeedback from '../helpers/classes/ErrorFeedback'


const client = axios.create({
    baseURL: 'http://moving-forward.local/wp-json/wp/v2',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    create (data) {
        return client.post('/user_deliveries', data)
            .then(
                async ({data}) => {
                    const userDelivery = await data
                    return userDelivery
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },

    /**
     * @returns {Boolean}
     */
    checkIfExists (data) {
        return client.get('/user_deliveries/' + data.customer_id + '/' + data.delivery_id)
            .then(
                async ({ data }) => {
                    const res = await data
                    return res.data
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    },


    /**
     * @returns {Boolean}
     */
     findAllForUser (id) {
        return client.get('/user_deliveries/' + id)
            .then(
                async ({ data }) => {
                    const res = await data
                    return res.data
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