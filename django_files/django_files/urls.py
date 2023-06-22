"""
URL configuration for django_files project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import re_path as url
from news_repos.views import *


urlpatterns = [
    path('admin/', admin.site.urls, name = 'admin_new'),
    path('save-repositories/', save_reps_test, name='save_repositories'),
    path('repositories/', RepositoryView.as_view(), name = 'repository'),
    path('programming-languages/', ProgrammingLanguageView.as_view(), name = 'programming-language'),
    path('github-users/', GithubUserView.as_view(), name = 'github_user'),
    path('users/', UserView.as_view(), name = 'user'),
    path('register/', RegisterUserView.as_view(), name = 'register'),
    path('auth/', LoginView.as_view(), name = 'authentication'),
]
