const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // will be using set port later

const userInfoRouter = require('./routes/userInformation');
const postInfoRouter = require('./routes/postInformation');


app.use(express.json());
app.use('/userInformation', userInfoRouter);
app.use('/postInformation', postInfoRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

