const express = require('express');
const userRouter = require('./routes/user-Routes');
const AppError = require('./utils/appError');

const app = express();

// ===== 1 =====
// Global Middleware
// ===========

app.use(express.json({ limit: '10kb' })); // to read req.body
app.use(express.urlencoded({ extended: true })); // to read urlEncodedData such as forms

// ===== 2 =====
// Routes
// ===========
app.use('/api/v1/users', userRouter);

// ===== 1 =====
// Unhandled route
// ===========

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

module.exports = app;
