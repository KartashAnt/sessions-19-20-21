import axios from 'axios';

export default axios.create({
    method:'GET',
    baseURL:'https://api.chucknorris.io/jokes',
    responseType:'json',
    timeout:5000
})