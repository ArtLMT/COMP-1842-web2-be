// app.js (Đã refactor sang ES Modules)

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url'; // Cần thiết để xử lý __dirname trong ES Modules

// 1. Thay thế require bằng import cho các Router
import indexRouter from './routes/index.js'; // Thêm đuôi .js
import taskRouter from './routes/tasks.js'; // Thêm đuôi .js
import userRouter from './routes/users.js'; // Thêm đuôi .js
// import statusRouter from './routes/status.js'; // Thêm đuôi .js

import errorHandler from "./middlewares/errorHandler.js"; // Thêm đuôi .js

// 2. Khắc phục __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 3. Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todolist')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cho phép tất cả các origin
app.use(cors());
// Hoặc chỉ cho phép Vue truy cập
// app.use(cors({ origin: 'http://localhost:8080' }));

// 4. Sử dụng Router
app.use('/', indexRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
// app.use('/status', statusRouter);

app.use(errorHandler)

// 5. Thay thế module.exports bằng export default
export default app;