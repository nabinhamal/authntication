import express from "express"
import cors from 'cors'
import morgan from 'morgan'
import connect from "./database/conn.js";

import router from './router/route.js';

import path from 'path';
import { fileURLToPath } from 'url';

//es6 fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


/**middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powerde-by');//less hackoers know about our stack

app.use(express.static(path.join(__dirname, './client/build')))


//rest api
app.use('*', function(req,res){
   res.sendFile(path.join(__dirname, './client/build/index.html'));
 });

const port = process.env.PORT || 8080;

/**Http get request */
 app.get('/',(req,res)=>{
    res.status(201).json("Home get request")
 })
 
/**api routes */
app.use('/api',router)


 /**start serve  only we have valid connection*/
 connect().then(() =>{
    try{
        app.listen(port ,()=>{
            console.log(`server connected to ${port}`)
         })
    }catch(errro){
        console.log('Cannot connect to server')
    }
 }).catch(error =>{
    console.log("invalid database connection..")
 })
