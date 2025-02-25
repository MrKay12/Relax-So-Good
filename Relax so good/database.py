from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")
db = client["Rela_So_Good"]
collection = db["User"]
document = {"nom": "Test", "valeur": 43}
inserted_doc = collection.insert_one(document)
print(f"Document inséré avec _id : {inserted_doc.inserted_id}")
for doc in collection.find():
    print(doc)








