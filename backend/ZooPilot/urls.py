from django.urls import path
from ZooPilot import views as v



app_name = 'backend'
urlpatterns = [
    path('api/getUsers/',v.getUsers),#GET
    path('api/addUser/',v.addUser),#POST
    path('api/deleteUser/<id>',v.deleteUser),#DELETE
    path('api/updateUser/<id>',v.updateUser),#PUT
    path('api/getSessions/<email>',v.getSessions),#GET
    path('api/getRecordings/<email>',v.getRecordings),#GET
    path('api/switchRecord/<email>',v.switchRecord),#PUT
    path('api/viewParticipants/<id>',v.viewParticipants),#GET


]