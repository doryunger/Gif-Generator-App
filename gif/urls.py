from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name='index'),
    path("upload",   views.generator, name='generator'),
    path("files", views.fileList, name='fileList'),
]