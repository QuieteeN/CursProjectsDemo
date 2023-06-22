# from django.contrib import admin
# from .models import Repository
# from .forms import RepositoryForm
# from .views import save_repository
# from django.urls import path
# from .views import save_repositories

# urlpatterns = [
#     # ...другие URL-шаблоны
#     path('', save_repositories, name='save_repositories'),
# ]

# class RepositoryAdmin(admin.ModelAdmin):
#     form = RepositoryForm
#     def save_repositories_action(request):
#         save_repository(request)
        
#     save_repositories_action.short_description = "Save repositories from Github API"
#     save_repositories_action.allow_tags = True

#     # actions = [save_repositories_action]

# admin.site.register(Repository, RepositoryAdmin)

from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import path
from .models import Repository, User, GithubUser, ProgrammingLanguage
from .views import save_repositories

class RepositoryAdmin(admin.ModelAdmin):
    def save_all_repos(self, request):
        save_repositories.delay()
        self.message_user(request, 'Данные о репозиториях сохраняются в фоновом режиме. Пожалуйста, подождите.')

        return HttpResponseRedirect('../')

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('save-all-repos/', self.admin_site.admin_view(self.save_all_repos), name='save_all_repos'),
        ]
        return custom_urls + urls

admin.site.register(Repository, RepositoryAdmin)
admin.site.register(GithubUser)
admin.site.register(ProgrammingLanguage)
admin.site.register(User)
