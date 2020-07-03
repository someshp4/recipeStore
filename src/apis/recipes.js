import axios from 'axios';

export default axios.create({
    baseURL : "https://api.spoonacular.com",
    params : {
        apiKey : process.env.REACT_APP_SPOONACULAR_API_KEY
    }
});