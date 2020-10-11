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
from bson.objectid import ObjectId



# Create your views here.

@api_view(['GET'])
def getUsers(request):
    if request.method == 'GET':
        col = get_collecetion('ZooPilot','Users')
        cursor = col.find()
        users = []
        for doc in cursor:
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
        get_collecetion('ZooPilot','Users').insert_one(user)
    return HttpResponse(status=200)

@csrf_exempt
def deleteUser(request,id):
    if request.method == 'DELETE':
        get_collecetion('ZooPilot','Users').delete_one({'_id':ObjectId(id)})
    return HttpResponse(status=200)

@csrf_exempt
def updateUser(request,id):
    if request.method == 'PUT':
        old_email = get_collecetion('ZooPilot','Users').find_one({'_id':ObjectId(id)},{'email':1})['email']
        data = json.loads(request.body)
        updated_user = {
            'name': data['name'],
            'email': data['email']
        }
        get_collecetion('ZooPilot','Users').update_one({'_id':ObjectId(id)},{'$set':updated_user})
    return HttpResponse(status=200)

@api_view(['GET'])
@csrf_exempt
def getSessions(request,email):
    if request.method == 'GET':
        owner = get_collecetion('ZooPilot','Users').find_one({'email':email},{'name':1})
        if(owner != None):
            name = owner['name']
            ownerID = owner['_id']
            cursor = get_collecetion('ZooPilot','Sessions').find({'owner':ownerID})
            sessions = []
            for doc in cursor:
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
        return HttpResponse('User does not exist',content_type='text/plain',status=400)

@api_view(['GET'])
@csrf_exempt
def getRecordings(request,email):
    if request.method == 'GET':
        author = get_collecetion('ZooPilot','Users').find_one({'email':email},{'name':1,'can_record':1})
        if(author != None):
            authorID = author['_id']
            cursor = get_collecetion('ZooPilot','Recordings').find({'author':authorID})
            recordings = []
            for doc in cursor:
                sessionID = doc['sessionID'] #object of type ObjectID
                session = get_collecetion('ZooPilot','Sessions').find_one({'_id':sessionID},{'owner':1,'date':1})
                owner_name = get_collecetion('ZooPilot','Users').find_one({'_id':session['owner']})['name']
                length = doc['length']

                recording = {
                    'id': str(doc['_id']),
                    'session_owner': owner_name,
                    'session_date': session['date'].strftime('%d/%m/%Y'),
                    'length': length
                }
                recordings.append(recording)
            return JsonResponse({'recordings':recordings,'name':author['name'],'can_record':author['can_record']})
        return HttpResponse('User does not exist',content_type='text/plain',status=400)

@csrf_exempt
@api_view(['PUT'])
def switchRecord(request,email):
    if request.method == 'PUT':
        oldVal = get_collecetion('ZooPilot','Users').find_one({'email':email},{'can_record':1})['can_record']
        get_collecetion('ZooPilot','Users').update_one({'email':email},{'$set':{'can_record': not oldVal}})
        return HttpResponse(status=200)

@csrf_exempt
@api_view(['GET'])
def viewParticipants(request,id):
    if request.method == 'GET':
        cursor = get_collecetion('ZooPilot','participants_in_session').find({'sessionID':ObjectId(id)},{'userID':1})
        participants = []
        for doc in cursor:
            user = {
                'id': str(doc['userID']),
                'name': get_collecetion('ZooPilot','Users').find_one({'_id':doc['userID']},{'name':1})['name'],
                'email': get_collecetion('ZooPilot','Users').find_one({'_id':doc['userID']},{'email':1})['email']
            }
            participants.append(user)
        return JsonResponse({'participants':participants})
    