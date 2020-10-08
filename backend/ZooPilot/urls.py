from django.urls import path
from ZooPilot import views as v


app_name = 'backend'
urlpatterns = [
    path('api/home/', v.home, name='home'),
    path('api/connectToDB/',v.ConnectToDB,name='connectToDB'),
]