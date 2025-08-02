import Router from 'express'
import serviceChuck from '../service/chuck.js'

const router = Router();

router.get('/categories',async (req,res)=>{
    try{
        const cat = await serviceChuck.getCategories()
        res.status(200).json(cat)
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/joke/:category', async (req, res) => {
  const { category } = req.params;
  
  try {
    const listCategories = await serviceChuck.getCategories();
    
    if (!listCategories.includes(category)) {
        return res.status(400).json({ 
            error: category + " is not a valid category", 
            validCategories: listCategories 
        });
    }

    const joke = await serviceChuck.getJokeByCategory(category);
    res.status(200).json(joke);

  } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {
  const  queryTerm  = req.query.query;
  if (!queryTerm) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const jokes = await serviceChuck.searchByQuery(queryTerm);
    res.status(200).json(jokes);
  } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', (req, res)=>{
    res.send("Server API Chuck Norris Jokes")
});

export default router