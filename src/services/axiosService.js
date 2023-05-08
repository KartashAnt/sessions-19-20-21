import APIRequest from '../utils/config/axios.config';

export const getChuckNorrisJoke=()=>{
    return APIRequest.get('/random');
}