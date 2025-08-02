import express from 'express'
import apiRoutes from './route/api.js'

const app =  express()
const PORT = 5000

app.use(express.json());
app.use('/', apiRoutes);


app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
});