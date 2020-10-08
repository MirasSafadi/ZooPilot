from backend import settings
from pymongo import MongoClient

#for connection to localhost:27017 or other physical site (change constants in settings.py)
#MONGO_CLIENT = MongoClient(settings.MONGO_HOST, settings.MONGO_PORT)

#for cloud connection - MongoDB Atlas
MONGO_CLIENT = MongoClient(settings.MONGO_CONNECTION_STRING)
