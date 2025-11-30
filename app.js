import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js'; 
import taskRouter from './routes/tasks.js'; 
import userRouter from './routes/users.js'; 
// import statusRouter from './routes/status.js'; 

import errorHandler from "./middlewares/errorHandler.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//  Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todolist')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
// app.use('/status', statusRouter);

app.use(errorHandler)

export default app;