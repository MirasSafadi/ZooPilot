from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse,QueryDict
from utils.mongo_tools import *
from pprint import pprint
from pymongo import *
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
import json
from hashlib import sha256
import datetime



# Create your views here.

@api_view(['GET'])
def getUsers(request):
    if request.method == 'GET':
        col = get_collecetion('ZooPilot','Users')
        cursor = col.find()
        users = []
        for doc in cursor:
            # pprint(doc)
            user = {
                'id': str(doc['_id']),
                'name': doc['name'],
                'email': doc['email']
            }
            users.append(user)
    # return HttpResponse(200)
    return JsonResponse({'users':users})

@api_view(['POST'])
@csrf_exempt #FOR TESTING ONLY
def addUser(request):
    if request.method == 'POST':
        data = request.data
        name = data['name']
        email = data['email']
        password = data['password'].encode('utf-8')
        #hash password before saving it to database
        hashed_password = sha256(password).hexdigest()
        user = {
            'name': name,
            'email': email,
            'password': hashed_password 
        }
        users_collection = get_collecetion('ZooPilot','Users')
        record_id = users_collection.insert_one(user)
        print(record_id, type(record_id))
    return HttpResponse(status=200)

@csrf_exempt
def deleteUser(request,email):
    if request.method == 'DELETE':
        users_collection = get_collecetion('ZooPilot','Users')
        record_id = users_collection.delete_one({'email':email})
    return HttpResponse(status=200)

@csrf_exempt
def updateUser(request,email):
    if request.method == 'PUT':
        data = json.loads(request.body)
        name = data['name']
        email = data['email']
        updated_user = {
            'name': name,
            'email': email
        }
        pprint(updated_user)
        users_collection = get_collecetion('ZooPilot','Users')
        record_id = users_collection.update_one({'email':email},{'$set':updated_user})
    return HttpResponse(status=200)

@api_view(['GET'])
@csrf_exempt
def getSessions(request,email):
    if request.method == 'GET':
        count = get_collecetion('ZooPilot','Users').find({'email':email},{'name':1}).count()
        if(count == 1):
            name = get_collecetion('ZooPilot','Users').find_one({'email':email},{'name':1})['name']
            col = get_collecetion('ZooPilot','Sessions')
            cursor = col.find({'owner':email})
            if cursor.count() == 0:
                return HttpResponse('User has no sessions', status=400)
            sessions = []
            for doc in cursor:
                pprint(doc)
                number_of_participants = get_collecetion('ZooPilot','participants_in_session').find({'sessionID':doc['_id']}).count()
                date = doc['date'].strftime('%d/%m/%Y')

                session = {
                    'id': str(doc['_id']),
                    'number_of_participants': number_of_participants,
                    'date': date,
                    'recording_enabled': ('Yes' if doc['recording_enabled'] else 'No')
                }
                sessions.append(session)
            return JsonResponse({'sessions':sessions,'owner_name':name})
        return HttpResponse('User does not exist',status=400)
    # return HttpResponse(203)
    