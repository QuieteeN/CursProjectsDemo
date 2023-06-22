from django.urls import path
from .views import save_repositories

urlpatterns = [
    path('save-repositories/', save_repositories, name='save_repositories'),
]