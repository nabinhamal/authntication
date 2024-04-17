import express from 'express';

import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
dotenv.config();

// ES6 fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to handle CORS
let corsAllow ={
    origin: "",
    methods: "PUT, GET,PATCH,DELETE,HEAD",
    credentials: true
}
app.use(cors(corsAllow))

// Middleware for setting security headers
app.use(helmet());

// Middleware for logging
app.use(morgan('combined'));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, './client/build')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// HTTP get request handler
app.get('/', (req, res) => {
  res.status(201).json('Home get request');
});

// API routes
app.use('/api', router);

// Rest API for serving React app
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the server only if there's a valid connection
connect()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server connected to ${process.env.PORT || 8080}`);
    });
  })
  .catch((error) => {
    console.log('Invalid database connection..', error);
  });
