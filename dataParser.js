function truncateDescription(description) {
  if (!description) return '';
  if (description.length > 100) {
    return `${description.substring(0, 100)}...`;
  }
  return description;
}

async function fetchLanguages(url, token) {
  try {
    const response = await fetch(url, {
      headers: { Authorization: token ? `token ${token}` : '' },
    });
    const data = await response.json();
    return Object.keys(data);
  } catch (error) {
    console.error(`Error fetching languages: ${error}`);
    return [];
  }
}

async function parseData(data, token) {
  if (!Array.isArray(data)) {
    throw new Error('Expected data to be an array');
  }

  const parsedDataPromises = data.map(async (repo) => ({
    name: repo.name,
    description: truncateDescription(repo.description),
    updated_at: repo.updated_at,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    languages: await fetchLanguages(repo.languages_url, token),
    topics: repo.topics,
    license: repo.license ? repo.license.name : '',
    url: repo.html_url,
  }));

  const parsedData = await Promise.all(parsedDataPromises);

  return parsedData;
}

module.exports = {
  parseData,
};
