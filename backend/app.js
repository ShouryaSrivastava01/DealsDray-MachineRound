const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');
const { signUp, signIn } = require("./controllers/login");
const { validateSignin } = require("./validators/validateLogin");
const { addEmployee, getEmployees, deleteEmployee, getEmployeeDetails, updateEmployee } = require("./controllers/employee");


const PORT = process.env.PORT;
const SERVER = process.env.SERVER || '127.0.0.1';
const MONGO_URI = process.env.MONGO_URI;


const app = express();

app.use(express.json());

mongoose.connect(MONGO_URI).then((e)=>console.log("Database connected")).catch((err)=>console.log(err)); 

app.get('/', (req,res) =>{
    res.send("hello world");
})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/signup', validateSignin, signUp);
app.post('/signin', validateSignin, signIn);
app.post('/employees/add', addEmployee);
app.get('/employee', getEmployees);
app.delete('/employee/:id', deleteEmployee)
app.get('/employee/:id', getEmployeeDetails)
app.put('/employee/:id', updateEmployee);


app.listen(PORT,SERVER, ()=>{
    console.log(`Listening at http//${SERVER}:${PORT}`);
})