# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

import dog_breeds
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

        image = retrieve_breed_image(breed)
        recommendations = retrieve_age_recommendations(age)

        return []


def retrieve_breed_image(breed):
    split_breed = breed.split()
    dog_breeds_set = set(dog_breeds.all)

    if (len(split_breed) > 1) and (split_breed[0] in dog_breeds_set):
        query = f'{split_breed[0]}/{split_breed[1]}'
    elif len(split_breed) > 1:
        query = f'{split_breed[1]}/{split_breed[0]}'
    else:
        query = breed

    if animal == "perro":
        uri = f'https://dog.ceo/api/breed/{query}/images/random'
    else:
        uri = f''
    r = requests.get(uri)

    return r.json()["message"]


def retrieve_age_recommendations(age):
    pass