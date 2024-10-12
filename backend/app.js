const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // will be using set port later


const userRoutes = require('./routes/user');
// const productRoutes = require('./routes/products');


app.use(express.json());
app.get('/', (req, res) => {
    res.send('hi')
});
app.use('/users', userRoutes);
// app.use('/products', productRoutes);

// ... other app setup

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
}); 