const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
