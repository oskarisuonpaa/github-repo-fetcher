const express = require('express');
const dataParser = require('./dataParser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.GITHUB_TOKEN;
const BASE_URL = 'https://api.github.com';

app.use(express.json());
app.use(cors());


app.get('/repos/:username', async (request, response) => {
  const { username } = request.params;
  const url = `${BASE_URL}/users/${username}/repos`;

  try {
    const repos = await fetch(url, {
      headers: { Authorization: TOKEN ? `token ${TOKEN}` : '' },
    });
    const data = await repos.json();
    const parsedData = await dataParser.parseData(data, TOKEN);
    response.json(parsedData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get('/repos/:username/starred', async (request, response) => {
  const { username } = request.params;
  const url = `${BASE_URL}/users/${username}/starred`;

  try {
    const repos = await fetch(url, {
      headers: { Authorization: TOKEN ? `token ${TOKEN}` : '' },
    });
    const data = await repos.json();
    const parsedData = await dataParser.parseData(data, TOKEN);
    response.json(parsedData);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
