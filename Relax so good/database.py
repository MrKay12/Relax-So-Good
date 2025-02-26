from pymongo import MongoClient

class Database:
    def __init__(self, uri="mongodb://localhost:27017/", db_name="Rela_So_Good"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def get_collection(self, collection_name):
        return self.db[collection_name]

# Example usage
#if __name__ == "__main__":
#    db = Database()
#    user_collection = db.get_collection("User")
#    document = {"nom": "Test", "valeur": 45}
#    inserted_doc = user_collection.insert_one(document)
#    print(f"Document inséré avec _id : {inserted_doc.inserted_id}")
#    for doc in user_collection.find():
#        print(doc)








