# GitApi
In order to launch the server you need to create a 'yourToken.py' file first with code:
```
 class Token:
    def __init__(self):
        self.yourToken = "yourGitHubAuthToken"
```
This python server when launched provides two types of data from GitHubAPI:
1. On url: `localhost:5000/repositories/{name}`. Information about GitHub user such as:
  - Login
  - Name
  - Bio
  - array of languages used in user repositories (name of the language: bytes of code in that language)
on url: `localhost:5000/user/{name}`
2. On url: `localhost:5000/repositories/{name}`. Information about GitHub users repositories  such as:
  - Repository Name
  - array of languages used in given repository (name of the language: bytes of code in that language)

# USER JSON FORMAT:
```
{
  "login": GithuLogin,
  "name": GithubName,
  "bio": GithubBio,
  "languages": 
  {
    "LanguageName": numberOfBytes,
  }
}
```
# REPOSITORIES JSON FORMAT
```
[
 {
  "name": RepositoryName,
  "languages": 
  {
    "languageName": numberOfBytes,   
  }
 },
 {
  "name": RepositoryName,
  "languages": 
  {
    "languageName": numberOfBytes,   
  }
 },
]
```
