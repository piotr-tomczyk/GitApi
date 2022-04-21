# GitApi
This python server when launched provides two types of data from GitHubAPI:
1. Information about GitHub user such as:
  - Login
  - Name
  - bio
  - array of languages used in user repositories (name of the language: bytes of code in that language)
on url: `localhost:5000/user/{name}`
2. Information about GitHub users repositories such as:
  - Repository Name
  - array of languages used in given repository (name of the language: bytes of code in that language)
on url: `localhost:5000/repositories/{name}`
