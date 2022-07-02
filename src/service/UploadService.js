import axios from 'axios';
import store from '@/store/index.js'

const client = axios.create()
client.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


export default {
    upload (file) { 
        const formData = new FormData();
        formData.append("file", file);
        
        return client
            .post('http://moving-forward.local/wp-json/wp/v2/media', formData, {headers: { 'Authorization': 'Bearer ' + store.state.token }})
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