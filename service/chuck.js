//const axios = require('axios');
import axios from 'axios'

async function getCategories() {
    try{
        const cat = await axios.get("https://api.chucknorris.io/jokes/categories")
        return(cat.data)
    }
    catch(err){
        console.log("Error: "+err)
        throw err;
    }
}

const getJokeByCategory = async (category) => {

    try{
        const joke = await axios.get("https://api.chucknorris.io/jokes/random?category="+category);
        return { "id" : joke.data.id, "url" : joke.data.url, "category": joke.data.categories[0], "value" : joke.data.value}
        
    }
    catch(err){
        console.log("Error:", err)
        throw err;
    }
  
};

const searchByQuery = async (query) => {

    try{
        const response = await axios.get("https://api.chucknorris.io/jokes/search?query="+query);
        return {
            total: response.data.total,
            jokes: response.data.result.map(joke => ({
                id: joke.id,
                url: joke.url,
                categorie: joke.categories[0],
                value: joke.value,
                
            }))
        };
        
    }
    catch(err){
        console.log("Error:", err)
        throw err;
    }
  
};





export default {
  getCategories,
  getJokeByCategory,
  searchByQuery
};