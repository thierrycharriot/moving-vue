import axios from 'axios';
import store from '@/store/index.js'

const client = axios.create({
    baseURL: 'http://moving-forward.local/wp-json/wp/v2/users/'
})
client.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


export default {
    getProfilePicture (user_id) { 
        return client
            .get(`${user_id}/picture`, {headers: { 'Authorization': 'Bearer ' + store.state.token }})
            .then(
            async ( response ) => {
                const responseData = await response.data
                return { data: responseData, status: response.status }
            })
            .catch(
                (error) => { console.log('error:', error)}
            )
        },
    setProfilePicture (user_id, picture_id) { 
        return client
            .post(`${user_id}/picture/${picture_id}`, {headers: { 'Authorization': 'Bearer ' + store.state.token }})
            .then(
            async ( response ) => {
                const responseData = await response.data
                return { data: responseData, status: response.status }
            })
            .catch(
                (error) => { console.log('error:', error)}
            )
        }
}