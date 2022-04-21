import requests
import json
from yourToken import *

class Language:
    def __init__(self, name, bytes):
        self.name = name
        self.bytes = bytes

class Repository:
    def __init__(self, name, languages):
        self.name = name
        self.languages = languages

class User:
    def __init__(self, login, name, bio, repositories):
        self.login = login
        self.name = name
        self.bio = bio
        self.languages = self.agregateLanguages(repositories)
        self.repositories = self.repositoriesToDict(repositories)

    def repositoriesToDict(self, repositories):
        repositoriesTableOfDicts = []
        for repository in repositories:
            languagesInfo = {}
            for language in repository.languages:
                    languagesInfo[language.name] = language.bytes
            repositoryDict = {
                "name":  repository.name,
                "languages": languagesInfo
            }
            repositoriesTableOfDicts.append(repositoryDict)
        return repositoriesTableOfDicts


    def agregateLanguages(self, repositories):
        languagesInfo = {}
        for repository in repositories:
            for language in repository.languages:
                if language.name in languagesInfo:
                    languagesInfo[language.name] += language.bytes
                else:
                    languagesInfo[language.name] = language.bytes
        return languagesInfo
    def toJSON(self, option):
        if option == 1:
            data_set = {
                "login": self.login,
                "name": self.name,
                "bio": self.bio,
                "languages": self.languages
            }
        if option == 0:
            data_set = {
                "repositories": self.repositories
            }
        json_dump = json.dumps(data_set)
        return json.loads(json_dump)

class Fetcher:
    def fetch(self, username):
        username = username
        token = Token()
        header = {'Authorization': 'token %s' % token.yourToken}
        u_url = f"https://api.github.com/users/{username}"

        user_data = requests.get(u_url, headers=header).json()

        r_ul = user_data['repos_url']

        repos_data = requests.get(r_ul, headers=header).json()

        repositories = []

        for i in range(len(repos_data)):
            l_ul = repos_data[i]['languages_url']
            l_data = requests.get(l_ul, headers=header).json()
            languages = []
            for key in l_data:
                languages.append(Language(key, l_data[key]))        
            repositories.append(Repository(repos_data[i]['name'], languages))

        user = User(user_data['login'], user_data['name'], user_data['bio'], repositories)

        return user