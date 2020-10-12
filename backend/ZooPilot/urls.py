from django.urls import path
from ZooPilot import views as v



app_name = 'backend'
urlpatterns = [
    path('api/users/',v.users),# GET, POST
    path('api/users/<id>',v.users_update),#PUT, DELETE
    path('api/sessions/<email>',v.sessions),#GET
    path('api/recordings/<email>',v.recordings),#GET, PUT
    path('api/participants/<id>',v.participants),#GET
]