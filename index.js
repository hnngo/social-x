const express = require('express');
const authRoute = require('./routes/authRoute');

// Create express app
const app = express();

// Setup routes
app.get('/', (req, res) => {
  res.send({ hi: "there" });
})

app.use('/auth', authRoute);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT);
