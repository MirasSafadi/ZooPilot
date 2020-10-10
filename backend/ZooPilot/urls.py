from django.urls import path
from ZooPilot import views as v



app_name = 'backend'
urlpatterns = [
    path('api/index/', v.index),
    path('api/connectToDB/',v.ConnectToDB),
    path('api/getUsers/',v.getUsers),#GET
    path('api/addUser/',v.addUser),#POST
    path('api/deleteUser/<email>',v.deleteUser),#DELETE
    path('api/updateUser/<email>',v.updateUser),#PUT
    path('api/getSessions/<email>',v.getSessions),#GET
]