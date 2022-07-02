import axios from 'axios'
import ErrorFeedback from '../helpers/classes/ErrorFeedback'


const client = axios.create({
    //baseURL: 'https://nominatim.openstreetmap.org/search.php',
    headers: {
        Accept: '*/*'
    },
    timeout: 10000
})

export default {
    /* findByNameLike (strToCompare, inFrance = true) {
        return client.get(`?format=geojson&q=${strToCompare}` + inFrance ? '&countrycodes=fr' : '')
            .then(
                async ({data}) => {
                    const allResults = await data
                    console.log(allResults)
                    return allResults
                }
            )
            .catch(
                ({response}) => {
                    // From the API error, inform the user of what happened there
                    new ErrorFeedback(response, true)
                }
            )
    } */
    findByNameLike (strToCompare) {
        return client.get(`https://api-adresse.data.gouv.fr/search/?q=${strToCompare}&type=municipality&limit=5`)
            .then(
                async ({data}) => {
                    const allResults = await data
                    return allResults
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