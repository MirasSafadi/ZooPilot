from backend import settings
from pymongo import MongoClient

#for connection to localhost:27017 or other physical site (change constants in settings.py)
#MONGO_CLIENT = MongoClient(settings.MONGO_HOST, settings.MONGO_PORT)

#for cloud connection - MongoDB Atlas
MONGO_CLIENT = MongoClient(settings.MONGO_CONNECTION_STRING)

#can write script to maintain the database upon server startup here:
#Below is an examlpe of populating the participant_in_session collection

# import random


# def random_date():
#     import datetime
#     day = random.randint(1,31)
#     month = random.randint(1,12)
#     year = random.randint(2019,2020)

#     hour = random.randint(0,23)
#     minute = random.randint(0,59)

#     date_str = '%d-%d-%d %d:%d'%(day,month,year,hour,minute)
#     date_obj = datetime.datetime.strptime(date_str,'%d-%m-%Y %H:%M')

#     return date_obj






# sessions = []
# cursor = MONGO_CLIENT.ZooPilot.Sessions.find()
# for doc in cursor:
#     sessions.append(doc)


# users = []
# cursor = MONGO_CLIENT.ZooPilot.Users.find()
# for doc in cursor:
#     users.append(doc)

# for i in range(0,101):
#     userID = random.choice(users)['_id']
#     sessionID = random.choice(sessions)['_id']

#     participant = {
#         'userID': userID,
#         'sessionID': sessionID
#     }
#     MONGO_CLIENT.ZooPilot.participants_in_session.insert_one(participant)




