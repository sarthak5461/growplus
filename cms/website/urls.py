from django.urls import path

from . import views

urlpatterns = [
    path("content/", views.content),
    path("leads/", views.leads),
    path("newsletter/", views.newsletter),
]
