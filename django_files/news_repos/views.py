from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views import View

from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login


from utils.github_utils import *                                            #   IMPORT utils for work with Github API
from .models import Repository, GithubUser, User, ProgrammingLanguage     
from .serializer import *
from django.http import JsonResponse
import json

class LoginView(APIView):
    def post(self, request):
        name = request.data.get('login')
        password = request.data.get('password')

        user = authenticate(name=name, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Аутентификация прошла успешно'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Неверные учетные данные'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = json.loads(request.body)
        name = data['login']
        password = data['password']
        mail = data['email']
        pro_langs = data['loveProgramming']
        githubUser = data['githubUser']
        username = data['username']

        if githubUser == 'null' or githubUser == 'undefined':
            githubUser = None

        # Создание нового пользователя
        user = User(name=name, password=password, mail=mail, githubUser=githubUser, username=username)
        user.save()

        # Сохранение связей пользователя с группами
        for lang in pro_langs:
            language = ProgrammingLanguage.objects.get(name=lang)
            user.loveProgrammingLanguages.add(language)

        return JsonResponse({'message': 'Регистрация успешно завершена'})

class GithubUserView(APIView):
    def get(self, request):
        githubusers = GithubUser.objects.all()
        serializer = GithubUserSerializer(githubusers, many = True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = GithubUserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class ProgrammingLanguageView(APIView):
    def get(self, request):
        programming_language = ProgrammingLanguage.objects.all()
        serializer = ProgrammingLanguageSerializer(programming_language, many = True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProgrammingLanguageSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    

class UserView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many = True )
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


class RepositoryView(APIView):
    def get(self, request):
        repositories = Repository.objects.all()
        serializer = RepositorySerializer(repositories, many = True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = RepositorySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




#   ------------ VIEWS FOR ------------
#   ----- SAVING DATA IN DATABASE -----

#   save repository
def save_repository(request, repo):
    if Repository.get_id_by_full_name(repo['full_name']):
        print('repository is exists')
    else:
        owner_id = GithubUser.get_id_by_login(get_owner(repo)['login'])
        lang_id = ProgrammingLanguage.get_id_by_name(get_popular_language(repo))

        #   make repository object
        repository = Repository(
            name                = get_name(repo),                                                   
            full_name           = get_full_name(repo),                                              
            description         = get_description(repo),                                            
            forks               = len(get_forks(repo)),                                             
            stargazers          = len(get_stargazers(repo)),                                        
            owner               = GithubUser.objects.get(id=owner_id),             
            programmingLanguage = ProgrammingLanguage.objects.get(id=lang_id)    
        )

        repository.save()                                           #   SAVE repo
        contributors = get_contributors(repo)                       #   GETTING repo's contributors

        #   save contributors in database
        for contributor in contributors:
            cont_id = GithubUser.get_id_by_login(contributor['login'])
            if cont_id == None:    
                save_github_user(request, contributor)
                cont_id = GithubUser.get_id_by_login(contributor['login'])
            cont = GithubUser.objects.get(id=cont_id)
            repository.contributors.add(cont)

        repository.save()                                           


def save_reps_test(request):
    repositories = get_new_repos()
    # for repo in repositories:
    #     # owner = get_owner(repo)             
    #     # save_github_user(request, owner)

    #     print(repo['name'])

    for repo in repositories:
        owner = get_owner(repo)   
        lang = get_popular_language(repo)
        save_programming_lang(request, lang)            
        save_github_user(request, owner)

        save_repository(request, repo)
    
    return HttpResponse('Репозитории сохранены успешно')


#   save all public repos
def save_repositories(request):
    repositories = get_all_repos()

    # with open('data.txt', 'w') as outfile:
    #     json.dump(repositories, outfile)

    #   save data in database
    for repo in repositories:
        owner = get_owner(repo)   
        lang = get_popular_language(repo)
        save_programming_lang(request, lang)          
        save_github_user(request, owner)

        save_repository(request, repo)      #   SAVING repo data

    return HttpResponse('Репозитории сохранены успешно')

    

#   save Github user
def save_github_user(request, user_account):
    if GithubUser.get_id_by_login(user_account['login']):
        print('User exist')
    else:
        github_user = GithubUser(
            name = user_account['login'],
            avatar_url = user_account['avatar_url'],
            github_account_url = user_account['html_url']
        )
        github_user.save()
        print('success saved ', user_account['login'])


#   save programming language
def save_programming_lang(request, lang):
    if ProgrammingLanguage.get_id_by_name(lang):
        print('Programming language is exists')
    else:
        lang_prog = ProgrammingLanguage(
            name = lang,
            color = '#ffffff'
        )
        lang_prog.save()
        print('Success saved ', lang)

def save_user(request):
    pass