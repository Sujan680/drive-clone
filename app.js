const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();

const app = express();  

app.set('view engine', 'ejs');

//built-in middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})