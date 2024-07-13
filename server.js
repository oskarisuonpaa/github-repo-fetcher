const express = require('express');
const axios = require('axios');
const dataParser = require('./dataParser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.GITHUB_TOKEN;

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/rate_limit', {
      headers: { Authorization: TOKEN ? `token ${TOKEN}` : '' },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error });
  }
});

app.get('/api/:username', async (req, res) => {
  const user = req.params.username;
  try {
    const response = await axios.get(
      `https://api.github.com/users/${user}/repos`,
      {
        headers: { Authorization: TOKEN ? `token ${TOKEN}` : '' },
      }
    );
    const parsedData = await dataParser.parseData(response.data);
    res.json(parsedData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).send('User not found');
    } else {
      res.status(500).json({ error: 'Internal server error', message: error });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
