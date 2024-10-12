const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // will be using set port later


const userRoutes = require('./routes/user');
const followingRoutes = require('./routes/followerInfo');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi')
});

app.use('/followingInfo', followingRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
}); 