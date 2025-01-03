/**
 * Updated by augustus.hyu_'s author on January 02, 2024
 * "Code is like humor. When you have to explain it, it’s bad." by Cory House
 */
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const port = process.env.PORT || 8888;

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});