const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config')

app.use(cors());
// HOME Page
app.get('/', (req, res) => {
    res.send('<h1>welcome to home page</h1>');
})

const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
app.use("/posts", postRoute);
app.use("/posts/userAddress", postRoute);
app.use("/users", userRoute);

// Connect to Mongo DB
// mongoose.connect(process.env.DB_CONNECTION,
//     { useNewUrlParser: true },
//     () => console.log('connected to DB'));
mongoose.connect(process.env.DB_CONNECTIOn, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected successfully....."))
    .catch((err) => console.log(err));



app.listen(3000);