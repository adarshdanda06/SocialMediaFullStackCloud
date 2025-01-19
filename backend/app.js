const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000; 


const userRoutes = require('./routes/user');
const followingRoutes = require('./routes/followerInfo');
const postRoutes = require('./routes/postInformation');
const loginRegisterRoutes = require('./routes/loginRegister');

app.use(cors(
    /*
    {
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true
}
*/    
));
/*
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, '../frontend/build');
app.use(express.static(buildPath));

app.get("/*", function(req, res) {
    res.sendFile(
        path.join(__dirname, '../frontend/build'),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
})
*/
//app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.json());

//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, '../frontend/build'));
//  });


app.get('/', (req, res) => {
    res.send('hi')
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use('/postInfo', postRoutes);
app.use('/followingInfo', followingRoutes);
app.use('/users', userRoutes);
app.use('/loginActions', loginRegisterRoutes);


app.get('*', (req, res) => {
    res.send('404 - Not found');
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on localhost:${PORT}`)
});



module.exports = app;


