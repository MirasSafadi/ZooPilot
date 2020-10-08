from backend import settings
from pymongo import MongoClient

MONGO_CLIENT = MongoClient(settings.MONGO_HOST, settings.MONGO_PORT)