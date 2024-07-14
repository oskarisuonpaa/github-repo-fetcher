# GitHub Repo Fetcher
<b> Under active development and subject to change! <b>

Simple microservice API server that fetches all public or only starred repositories of given user. <br>
Fetches the following information for each repository: <br>
- name
- description
- url
- stargazers count
- forks count
- languages : all languages used
- updated at
- license : if exists
- topics

## Current endpoints:
- GET: /repos/:username : all public repositories of the user
- GET: /repos/:username/starred : all starred public repositories of the user
