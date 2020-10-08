from django.urls import path
from ZooPilot import views as v


app_name = 'backend'
urlpatterns = [
    path('api/index/', v.index, name='index'),
    path('api/connectToDB/',v.ConnectToDB,name='connectToDB'),
    path('api/getUsers/',v.getUsers,name='getUsers'),
]