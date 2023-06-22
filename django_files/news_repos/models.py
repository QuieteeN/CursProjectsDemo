from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class ProgrammingLanguage(models.Model):
    name    = models.CharField(max_length = 50)
    color   = models.CharField(max_length = 9)

    @staticmethod
    def get_id_by_name(name):
        try:
            obj = ProgrammingLanguage.objects.filter(name=name).first()
            if obj:
                return obj.id
            else:
                return None
        except ProgrammingLanguage.DoesNotExist:
            return None


class GithubUser(models.Model):
    name                = models.CharField(max_length = 100)
    avatar_url          = models.URLField()
    github_account_url  = models.URLField()

    @staticmethod
    def get_id_by_login(login):
        try:
            obj = GithubUser.objects.filter(name=login).first()
            if obj:
                return obj.id
            else:
                return None
        except GithubUser.DoesNotExist:
            return None


class Repository(models.Model):
    name                = models.CharField(max_length = 100)
    full_name           = models.CharField(max_length = 200)
    description         = models.TextField(null=True)
    forks               = models.IntegerField()
    stargazers          = models.IntegerField()
    owner               = models.ForeignKey(GithubUser, related_name='repository', on_delete = models.CASCADE)
    programmingLanguage = models.ForeignKey(ProgrammingLanguage, null=True, related_name='repos_lang', on_delete = models.CASCADE)
    contributors        = models.ManyToManyField(GithubUser, related_name='contributors')

    @staticmethod
    def get_id_by_full_name(full_name):
        try:
            obj = Repository.objects.filter(full_name=full_name).first()
            if obj:
                return obj.id
            else:
                return None
        except Repository.DoesNotExist:
            return None


class User(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='news_repos_users'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='news_repos_users'
    )

    name                        = models.CharField(max_length = 100)
    password                    = models.CharField(max_length=50)
    mail                        = models.EmailField()
    loveProgrammingLanguages    = models.ManyToManyField(ProgrammingLanguage)
    githubUser                  = models.ForeignKey(GithubUser, null = True, on_delete=models.CASCADE)

    def check_password(self, password):
        return self.password == password 

