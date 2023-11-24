import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import connect from "./database/conn.js";
import dotenv from 'dotenv';
import router from './router/route.js';

dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';

//es6 fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**middlewares */
app.use(express.json());
app.use(cors({
  origin: 'https://nabinauth.netlify.app', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(morgan('tiny'));
app.disable('x-powered-by'); // Less information about your stack

app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.use('/api', router);

// Serve React app
app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 8080;

/**Http get request */
app.get('/', (req, res) => {
  res.status(201).json("Home get request");
});

/**start serve only if we have a valid connection */
connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server connected to ${port}`);
    });
  } catch (error) {
    console.log('Cannot connect to server');
  }
}).catch(error => {
  console.log("Invalid database connection..");
});
