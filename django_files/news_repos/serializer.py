from rest_framework import serializers
from .models import ProgrammingLanguage, GithubUser, Repository, User


class ProgrammingLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgrammingLanguage
        fields = [ 'name', 'color' ] 


class GithubUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GithubUser
        fields = [ 'name', 'avatar_url', 'github_account_url' ]

class RepositorySerializer(serializers.ModelSerializer):
    owner = GithubUserSerializer()
    programmingLanguage = ProgrammingLanguageSerializer()
    contributors = GithubUserSerializer(many = True)
    
    class Meta:
        model = Repository
        fields = [ 'name', 'full_name', 'description', 'forks', 'stargazers', 'owner', 'programmingLanguage', 'contributors' ]

class UserSerializer(serializers.ModelSerializer):
    loveProgrammingLanguages = ProgrammingLanguageSerializer(many = True)
    githubUser = GithubUserSerializer()
    class Meta:
        model = User
        fields = [ 'name', 'password', 'mail', 'loveProgrammingLanguages', 'githubUser' ]