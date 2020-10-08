from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from utils.mongo_tools import *
from pprint import pprint
from pymongo import *



# Create your views here.
def index(request):
    return JsonResponse({'response_text':'Hello React World!'})

def ConnectToDB(request):
    if request.method == 'GET':
        print('hello')
    return HttpResponse(200)


def getUsers(request):
    if request.method == 'GET':
        col = get_collecetion('ZooPilot','Users')
        cursor = col.find()
        users = []
        for doc in cursor:
            pprint(doc)
            user = {
                'id': str(doc['_id']),
                'name': doc['name'],
                'email': doc['email']
            }
            users.append(user)
    # return HttpResponse(200)
    return JsonResponse({'users':users})
    