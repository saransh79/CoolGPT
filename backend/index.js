import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import database from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';

// routes
import authRoutes from './routes/authRoute.js'
import openaiRoutes from './routes/openaiRoute.js'

const app= express();
dotenv.config();
colors;

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(errorHandler);

// database
database();

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/openai', openaiRoutes);

const PORT= process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`.bgWhite.black);
})