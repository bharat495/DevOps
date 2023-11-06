const express = require('express');
const app = express();
const dotenv = require('dotenv');
const conn = require('./conn/conn');
const cors = require('cors');

dotenv.config({ path: './conf/.env' });
conn();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials: true,origin:[ 'http://localhost:3000'] }));

app.get('/',(req,res)=>{
    res.send('Hello World');
});

// Student Routes
app.use("/api/v1",require('./routes/studentRoutes'));

// Admin Routes
app.use("/api/v1",require('./routes/adminRoutes'));

app.listen(4000,()=>{
    console.log('Server started at port 4000');
});