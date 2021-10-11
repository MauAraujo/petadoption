# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

import pet_info
import requests
import urllib
from pymongo import MongoClient
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

client = MongoClient("mongodb://root:admin@127.0.0.1:27017/")
db = client.petadoption


class Action_Breed_Api(Action):
    def name(self) -> Text:
        return "action_breed_api"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        animal = tracker.get_slot("animal")
        age = tracker.get_slot("age")
        breed = tracker.get_slot("breed")

        if animal == "perro":
            breed.lower()
            image = retrieve_dog_image(breed)
            recommendations = retrieve_dog_recommendations(age, breed)
        elif animal == "gato":
            image, id = retrieve_cat_image(breed)
            recommendations = retrieve_cat_recommendations(age, id)

        dispatcher.utter_message(image=image)

        for rec in recommendations:
            dispatcher.utter_message(text=rec)
        dispatcher.utter_message(
            text="Espero mis recomendaciones puedan ayudarte en darle una mejor dieta a tu mascota."
        )
        dispatcher.utter_message(
            text="Visita este link para ver la dieta personalizada:"
        )
        dispatcher.utter_message(
            text=f"http://127.0.0.1:3000/articulo/{animal}/{age}/{breed}"
        )

        dispatcher.utter_message(text="¿Te puedo ayudar con otra cosa?")

        return []


def retrieve_dog_image(breed):
    split_breed = breed.split()
    dog_breed_set = set(pet_info.dog_breeds)

    if (len(split_breed) > 1) and (split_breed[0] in dog_breed_set):
        query = f"{split_breed[0]}/{split_breed[1]}"
    elif len(split_breed) > 1:
        query = f"{split_breed[1]}/{split_breed[0]}"
    else:
        query = breed

    uri = f"https://dog.ceo/api/breed/{query}/images/random"
    r = requests.get(uri)

    return r.json()["message"]


def retrieve_dog_recommendations(age, breed):
    dog = db.breeds.find_one(({"breed": breed}))
    recommendations = []

    recommendations.append(pet_info.general_dog_nutrition_statement)

    if age == "baby":
        recommendations.append(pet_info.puppy_nutrition)
    elif age == "adult":
        recommendations.append(pet_info.adult_dog_nutrition)
    elif age == "senior":
        recommendations.append(pet_info.senior_dog_nutrition)

    if dog is None:
        return recommendations
    if dog["brachycephalic"]:
        recommendations.append(pet_info.brachycephalic_nutrition)
    if dog["sensitive_stomach"]:
        recommendations.append(pet_info.dental_disease_nutrition)
    if dog["obesity_prone"]:
        recommendations.append(pet_info.obesity_nutrition)
    if dog["dental_disease_prone"]:
        recommendations.append(pet_info.dental_disease_nutrition)
    if dog["skin_problem_prone"]:
        recommendations.append(pet_info.skin_problem_nutrition)

    return recommendations


def retrieve_cat_image(breed):
    uri = f"https://api.thecatapi.com/v1/breeds/search?q={breed}&api_key=4e4b1f99-d8d0-4e93-a41f-e2b8c5a7b895"
    r = requests.get(uri)
    info = r.json()[0]
    id = info["id"]

    uri = f"https://api.thecatapi.com/v1/images/search?breed_id={id}&api_key=4e4b1f99-d8d0-4e93-a41f-e2b8c5a7b895"
    r = requests.get(uri)
    res = r.json()[0]
    image = res["url"]

    return image, id


def retrieve_cat_recommendations(age, id):
    cat = db.breeds.find_one({"breed": id})
    recommendations = []

    recommendations.append(pet_info.general_cat_nutrition_statement)

    if age == "baby":
        recommendations.append(pet_info.kitten_nutrition)
    elif age == "adult":
        recommendations.append(pet_info.adult_cat_nutrition)
    elif age == "senior":
        recommendations.append(pet_info.senior_cat_nutrition)

    if cat is None:
        recommendations.append(pet_info.cat_general_nutrition)
    else:
        recommendations.append(cat["recommendation"])

    return recommendations
