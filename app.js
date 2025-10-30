const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');

const app = express();

require('./models/User');
require('./models/Task');

// ✅ Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todolist')
    .then(() => console.log('✅ Connected to MongoDB todolist database'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

module.exports = app;
