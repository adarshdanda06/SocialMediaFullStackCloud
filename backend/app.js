const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // will be using set port later


const userRoutes = require('./routes/user');
const followingRoutes = require('./routes/followerInfo');
const postRoutes = require('./routes/postInformation');
const loginRegisterRoutes = require('./routes/loginRegister');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi')
});

app.use('/postInfo', postRoutes);
app.use('/followingInfo', followingRoutes);
app.use('/users', userRoutes);
app.use('/loginActions', loginRegisterRoutes)


app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
}); 