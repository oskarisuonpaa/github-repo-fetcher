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

## How to run:
- Clone the project.
- Navigate to the project directory.
- Run the following command: ````npm init````.
- To start the server run the following command: ````npm run start````.
- GitHub token and port can be specified by using environmental variables GITHUB_TOKEN and PORT.
