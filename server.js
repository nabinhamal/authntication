import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import connect from "./database/conn.js";
import router from './router/route.js';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path'
import bodyParser from 'body-parser'; 
dotenv.config(); 
const app = express();



const __dirname = path.resolve();
/**middlewares */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

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
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

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
