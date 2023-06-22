import requests     #   import "requests" for request any URL
import json         #   import "json" for work with json files


URL         = 'https://api.github.com/repositories'     #   unchangable repositories URL
changed_url = 'https://api.github.com/repositories'     #   changable repositories URL

#   headers for requests
HEADERS     =   {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    'Authorization': 'token ' + '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'      #   Github API token for work with data from github and getting access
}

#   parameters for requests
PARAMS      = {
    'since': 0, 
    'per_page': 30,
    'sort': 'updated',
    # 'access_token': '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'
}


#   Change variable "changed url"
def change_url(url):
    changed_url = url


#   Operations with repositories
#   getting repo's name
def get_name(repo):
    return repo['name']

#   getting repo's full name 
def get_full_name(repo):
    return repo['full_name']

#   getting repo's owners
def get_owner(repo):
    return repo['owner']

#   getting repo's description
def get_description(repo):
    return repo['description']

#   getting repo's forks
def get_forks(repo):
    url = repo['forks_url'] # forks url

    response = requests.get(url, headers = HEADERS) # get forks array
    forks = response.json()
    return forks

#   getting repo's popular language
def get_popular_language(repo):
    url = repo['languages_url'] # languages url

    response = requests.get(url, headers = HEADERS) # get languages dictonary
    languages = response.json()
    language = ''
    for key in languages.keys():
        language = key
        break
    return language

#   getting repo's stargazers
def get_stargazers(repo):
    url = repo['stargazers_url']

    response  = requests.get(url, headers = HEADERS)
    stargazers_users = response.json()
    return stargazers_users

#   getting repo's contributors
def get_contributors(repo):
    url = repo['contributors_url']

    response = requests.get(url, headers = HEADERS)
    contributors = response.json()
    return contributors



#   getting new 30 repositories
def get_new_repos():
    response = requests.get(URL, params = PARAMS, headers = HEADERS)

    repos = response.json()
    return repos


#   getting all public repos
def get_all_repos():
    global changed_url
    repos = []
    i = 0
    while i<30:

        try:    
            response = requests.get(changed_url, params = PARAMS, headers = HEADERS)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Ошибка при запросе: {e}")
            print("Возвращаем предыдущие данные:")
            return repos
        else:
            reps = response.json()
            repos.extend(reps)
            if 'next' in response.links.keys():
                PARAMS['since'] = repos[-1]['id']
                changed_url = response.links['next']['url']
            else:
                print("Enought")
                break
        i += 1
        # if response.status_code != 200:
        #     print('Error: ', response.status_code)
        #     break
    
    PARAMS['since'] = 0

    return repos


#   closure for getting array of repos
def repos_closure(ident = 0):

    id = ident

    def closure_inner(count, arr):
        nonlocal id
        repos = []
        index = id
        while index < id + count and index < len(arr):
            repos.append(arr[index])
            index += 1
        id = index
        return repos
    
    return closure_inner

def read_json(file_path):
    with open(file_path) as json_file:
        data = json.load(json_file)
    return data


# main algorithm
def main():
    get_arr_repos = repos_closure()
    arr = read_json(r'D:\Programming\projects\CursProject\django_files\utils\repos.json')
    repos_arr = []

    for i in range(1):
        rep_arr = get_arr_repos(10, arr)

        repos_arr.extend(rep_arr)
    for rep in repos_arr:
        print(get_popular_language(rep))    



if __name__ == "__main__":
    main()