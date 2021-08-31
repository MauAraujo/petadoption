# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

import pet_info
import requests
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class Action_Breed_Api(Action):

    def name(self) -> Text:
        return "action_breed_api"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        animal = tracker.get_slot("animal")
        age = tracker.get_slot("age")
        breed = tracker.get_slot("breed")

        if animal == "perro":
            image = retrieve_dog_image(breed)
            recommendations = retrieve_dog_recommendations(age)
        else:
            image = retrieve_cat_image(breed)
            recommendations = retrieve_cat_recommendations(age)

        dispatcher.utter_message(image=image)
        dispatcher.utter_message(text=recommendations)

        return []


def retrieve_dog_image(breed):
    split_breed = breed.split()
    dog_breed_set = set(pet_info.dog_breeds)

    if (len(split_breed) > 1) and (split_breed[0] in dog_breed_set):
        query = f'{split_breed[0]}/{split_breed[1]}'
    elif len(split_breed) > 1:
        query = f'{split_breed[1]}/{split_breed[0]}'
    else:
        query = breed

    uri = f'https://dog.ceo/api/breed/{query}/images/random'
    r = requests.get(uri)

    return r.json()["message"]


def retrieve_dog_recommendations(age):
    if age == "baby":
        recommendations = pet_info.puppy_nutrition
    elif age == "adult":
        recommendations = pet_info.adult_dog_nutrition
    elif age == "senior":
        recommendations = pet_info.senior_dog_nutrition
    return recommendations


def retrieve_cat_image(breed):
    uri = f'https://api.thecatapi.com/v1/breeds/search?q={breed}&api_key=4e4b1f99-d8d0-4e93-a41f-e2b8c5a7b895'
    r = requests.get(uri)
    info = r.json()[0]
    id = info["id"]

    uri = f'https://api.thecatapi.com/v1/images/search?breed_id={id}&api_key=4e4b1f99-d8d0-4e93-a41f-e2b8c5a7b895'
    r = requests.get(uri)
    res = r.json()[0]
    image = res["url"]

    return image


def retrieve_cat_recommendations(age):
    if age == "baby":
        recommendations = pet_info.kitten_nutrition
    elif age == "adult":
        recommendations = pet_info.adult_cat_nutrition
    elif age == "senior":
        recommendations = pet_info.senior_cat_nutrition
    return recommendations
