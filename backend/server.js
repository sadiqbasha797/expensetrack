const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const expenseRoutes = require('./routes/expense.routes');
const categoryRoutes = require('./routes/category.routes');
const summaryRoutes = require('./routes/summary.routes');

const app = express();

// Use CORS Middleware
app.use(cors()); // This will allow all domains. For restricted domains, see below.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', summaryRoutes);

// MongoDB Connection and Server Start
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });
