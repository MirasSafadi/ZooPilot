from django.urls import path
from . import views as v


app_name = 'backend'
urlpatterns = [
    path('api/hello/', v.home, name='hello'),
]