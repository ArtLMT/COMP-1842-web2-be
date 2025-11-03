const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');
// const statusRouter = require('./routes/status');

const cors = require('cors');
const app = express();

require('./models/User');
require('./models/Task');
const errorHandler = require("./middlewares/errorHandler");

// Connect MongoDB
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

app.use('/', indexRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
// app.use('/status', statusRouter);

app.use(errorHandler)


module.exports = app;
