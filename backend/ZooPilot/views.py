from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from utils.mongo_tools import get_mongo_db



# Create your views here.
def home(request):
    return JsonResponse({'response_text':'Hello React World!'})

def ConnectToDB(request):
    if request.method == 'GET':
        db = get_mongo_db('Users')
        print(db)
    return HttpResponse(200)
    