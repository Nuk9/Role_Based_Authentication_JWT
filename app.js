const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./Routes/User');
const passport = require('passport');

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// mongoDB connection 
const CONNECTION_URL = 'mongodb+srv://pardeep_mern_stack:5ZKd5aiyv3MXEHWy@cluster0.n66oq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))

app.use('/user', userRouter);