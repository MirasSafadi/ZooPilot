from backend import MONGO_CLIENT


def get_collecetion(db_name,collection_name):
    return MONGO_CLIENT[db_name][collection_name]