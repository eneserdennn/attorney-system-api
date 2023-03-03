const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const { errorHandler } = require('./middlewares/errorMiddleware');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/clients', require('./routes/clientRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
