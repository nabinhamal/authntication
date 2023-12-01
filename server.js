import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import connect from "./database/conn.js";
import router from './router/route.js';
import helmet from 'helmet';
import dotenv from 'dotenv';

import bodyParser from 'body-parser'; 
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config(); 

// es6 fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


  

/**middlewares */
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    methods:["GET" ,"POST"]
}));
app.use(express.json());
app.use(morgan('combined'));
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, './client/build')))

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 8080;

/**Http get request */
app.get('/', (req, res) => {
    res.status(201).json("Home get request");
});

/**api routes */
app.use('/api', router);

// rest api
app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

/**start server only if we have a valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to ${port}`);
        });
    } catch (error) {
        console.log('Cannot connect to server');
    }
}).catch(error => {
    console.log("Invalid database connection..", error);
});
