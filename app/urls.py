from django.urls import path
from . import views

urlpatterns = [
    path("", views.lobby, name="home"),
    path("room/", views.room, name="room"),
]