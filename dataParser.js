const axios = require('axios');

function truncateDescription(description) {
  if (!description) return '';
  if (description.length > 100) {
    return `${description.substring(0, 100)}...`;
  }
  return description;
}

async function fetchLanguages(url, token) {
  const response = await axios.get(url, {
    headers: { Authorization: token ? `token ${token}` : '' },
  });
  return Object.keys(response.data);
}

async function parseData(data, token) {
  const parsedData = await Promise.all(
    data.map(async (repo) => {
      const languages = await fetchLanguages(repo.languages_url, token);
      return {
        name: repo.name,
        description: truncateDescription(repo.description),
        url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        languages: languages,
        updated_at: repo.updated_at,
        license: repo.license ? repo.license.spdx_id : 'N/A',
        topics: repo.topics,
      };
    })
  );

  return parsedData;
}

module.exports = {
  parseData,
};
