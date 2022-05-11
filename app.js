const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

// mongoDB connection 
// add your connection_url in env file, it is disclosing database password. So add it in env file and use that variable.
const CONNECTION_URL = process.env.URL 
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))

const userRouter = require('./routes/User');
app.use('/user', userRouter);
