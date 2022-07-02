import axios from 'axios'
import ErrorFeedback from '../helpers/classes/ErrorFeedback'


const client = axios.create({
    baseURL: 'http://moving-forward.local/wp-json/wp/v2/deliveries/research',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export default {
    findAllRelated (deliveryNameLike, localization) {
        return client.get(`?delivery=${deliveryNameLike}&around=${localization}`)
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