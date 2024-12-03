const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.static('client'));
app.use(express.json());
let userModel
let porductModel
let checkemail
let checkpassword

async function connectToDB() {
    try {
        await mongoose.connect(
            "mongodb+srv://talniv:7v0JhoRtq0EdGKDG@cluster0.qz3zaky.mongodb.net/shop"
        );
        console.log('connected to DB');
        const userSchema = mongoose.Schema({
            user: String,
            email: String,
            password: String,
        });
        userModel = mongoose.model('user', userSchema);
        const ProductSchema = mongoose.Schema({
            name: String,
            price: Number,

        });
        porductModel = mongoose.model('products', userSchema);
    } catch (error) {
        console.log('ERROR: ' + error);
    }
}
connectToDB();
app.post('/', async (req, res) => {

    const { email, password } = req.body;

     

    const usersFromDB = await userModel.find({ email, password })
    
    if (
        
        usersFromDB.length !== 0
    ) {
        res.json({
            route: '/home',
        });
    } else {
        res.status(400).end();
    }
});

app.get('/signUp', (req, res) => {
    res.sendFile(__dirname + '/client/signUp.html')
    
})


app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/client/home.html')

})
app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/client/buy.html')

})
app.post('/signUp', async (req, res) => {
    const addUser = req.body    
    const userName = addUser.user
    const userEmail = addUser.email
    const userPassword = addUser.password

    const checkEmail = {
        email: userEmail
    }
    const userfind = await (userModel.find(checkEmail))

    if ((userName.length > 2) && (userEmail.indexOf('@') != -1)
        && (userPassword.length > 4)) {

        try {
            await userModel.create(addUser);
            res.json({
                route: '/',
            });
        }
        catch (error) {
            console.log(error)
            res.end();

        }
    }
   
    else {
        res.status(400).end();
    }
})



app.get('/products', async (req, res) => {
    try {
        const products = await  porductModel.find();
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'cant get products' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});

