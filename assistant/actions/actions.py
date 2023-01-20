# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

import requests
import urllib
from pymongo import MongoClient
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

client = MongoClient("mongodb://root:admin@147.182.175.166:27017/")
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
            text=f"http://147.182.175.166/dieta/{animal}/{age}/{breed}"
        )

        dispatcher.utter_message(text="¿Te puedo ayudar con otra cosa?")

        return []


def retrieve_dog_image(breed):
    split_breed = breed.split()
    dog_breed_set = set(dog_breeds)

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

    recommendations.append(general_dog_nutrition_statement)

    if age == "baby":
        recommendations.append(puppy_nutrition)
    elif age == "adult":
        recommendations.append(adult_dog_nutrition)
    elif age == "senior":
        recommendations.append(senior_dog_nutrition)

    if dog is None:
        return recommendations
    if dog["brachycephalic"]:
        recommendations.append(brachycephalic_nutrition)
    if dog["sensitive_stomach"]:
        recommendations.append(dental_disease_nutrition)
    if dog["obesity_prone"]:
        recommendations.append(obesity_nutrition)
    if dog["dental_disease_prone"]:
        recommendations.append(dental_disease_nutrition)
    if dog["skin_problem_prone"]:
        recommendations.append(skin_problem_nutrition)

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

    recommendations.append(general_cat_nutrition_statement)

    if age == "baby":
        recommendations.append(kitten_nutrition)
    elif age == "adult":
        recommendations.append(adult_cat_nutrition)
    elif age == "senior":
        recommendations.append(senior_cat_nutrition)

    if cat is None:
        recommendations.append(cat_general_nutrition)
    else:
        recommendations.append(cat["recommendation"])

    return recommendations


dog_breeds = [
    "affenpinscher",
    "african",
    "airedale",
    "akita",
    "appenzeller",
    "australian",
    "basenji",
    "beagle",
    "bluetick",
    "borzoi",
    "bouvier",
    "boxer",
    "brabancon",
    "briard",
    "buhund",
    "bulldog",
    "bullterrier",
    "cattledog",
    "chihuahua",
    "chow",
    "clumber",
    "cockapoo",
    "collie",
    "coonhound",
    "corgi",
    "cotondetulear",
    "dachshund",
    "dalmatian",
    "dane",
    "deerhound",
    "dhole",
    "dingo",
    "doberman",
    "elkhound",
    "entlebucher",
    "eskimo",
    "finnish"
    "frise"
    "germanshepherd"
    "greyhound"
    "groenendael"
    "havanese"
    "hound"
    "husky"
    "keeshond"
    "kelpie",
    "komondor",
    "kuvasz",
    "labradoodle",
    "labrador",
    "leonberg",
    "lhasa",
    "malamute",
    "malinois",
    "maltese",
    "mastiff",
    "mexicanhairless",
    "mix",
    "mountain",
    "newfoundland",
    "otterhound",
    "ovcharka",
    "papillon",
    "pekinese",
    "pembroke",
    "pinscher",
    "pitbull",
    "pointer",
    "pomeranian",
    "poodle",
    "pug",
    "puggle",
    "pyrenees",
    "redbone",
    "retriever",
    "ridgeback",
    "rottweiler",
    "saluki",
    "samoyed",
    "schipperke",
    "schnauzer",
    "setter",
    "sheepdog",
    "shiba",
    "shihtzu",
    "spaniel",
    "springer",
    "stbernard",
    "terrier",
    "vizsla",
    "waterdog",
    "weimaraner",
    "whippet",
    "wolfhound",
]

puppy_nutrition = """Una vez que el cachorro deja de ser amamantado es hora de hacer la transición a la comida 
para cachorros. Hay un número de cosas que hay que tener en consideración al momento de seleccionar un alimento
diseñado para ayudarlo a comenzar con su vida y sentar las bases para una vida saludable. La comida de buena 
calidad ayudará a que tu perrito adquiera toda la energía que necesita durante esta primera etapa de rápido crecimiento. 
Necesitan muchas calorías, proteínas y grasa para alimentar un cuerpo y una mente en crecimiento. 
Se considera que la mayoría de las razas alcanzaron la adultez en el ciclo de vida del perro alrededor del primer cumpleaños. 
Algunas razas toy o pequeñas pueden hacer esta transición más rápido y algunas razas más grandes o gigantes pueden tardar más 
en llegar a ser considerados adultos. Darle alimento para cachorros a tu perro es aceptable hasta los dos años de edad."""

adult_dog_nutrition = """Una vez que alcanza la adultez en el ciclo de vida del perro su cuerpo cambia y pasa de estar en proceso 
de crecimiento a entrar en un modo de mantenimiento y su meta es estar activo y saludable toda su vida. En esta etapa pueden 
surgir otras necesidades como alimentos para perros con pieles o tractos digestivos sensibles, algunos llevan vidas más activas 
o se dedican a deportes competitivos y necesitan más proteínas para tener un mejor rendimiento. Consulta con tu veterinario qué 
tipo de alimento debería comer tu perro de acuerdo al ciclo de vida del perro para suplir cualquier necesidad específica que pueda tener."""

senior_dog_nutrition = """Alrededo de los siete años de edad, es recomendado darle alimento especial para mayores a tu perro. Estos alimentos
contienen un nutrientes y características que ayudan a mejorar la salud de un perro mayor. Las comidas para perros mayores contienen una mayor cantidad
de proteínas que son fáciles de digerir, así como una mejor cantidad de calorías."""

general_dog_nutrition_statement = """A continuación te daré unas recomendaciones según las caracerísticas de tu mascota. Las necesidades individuales 
de tu mascota pueden variar, por lo tanto, es mejor consultar con el veterinario si no estás seguro de que tu perro requiere de una dieta específica. 
La mayoría de los perros come dos veces al día, una por la mañana y otra por la noche, preferiblemente a la misma hora."""

general_cat_nutrition_statement = """A continuación te daré unas recomendaciones según las caracerísticas de tu mascota. Las necesidades individuales 
de tu mascota pueden variar, por lo tanto, es mejor consultar con el veterinario si no estás seguro de que tu perro requiere de una dieta específica. 
La mayoría de los gatos come una vez al día."""

tiny_nutrition = """Si tu perro pesa entre 1 y 5 kg, la cantidad ideal de alimento son entre 35 y 100 gramos.
Si tu perro pesa entre 5 y 10 kg, la cantidad ideal de alimento son entre 100 y 150 gramos."""

medium_nutrition = """Si tu perro pesa entre 11 y 25 kg, la cantidad ideal de alimento son entre 160 y 300 gramos.
Si tu perro pesa entre 25 y 35 kg, la cantidad ideal de alimento son entre 300 y 380 gramos."""

giant_nutrition = """Si tu perro pesa entre 36 y 45 kg, la cantidad ideal de alimento son entre 400 y 470 gramos.
Si tu perro pesa entre 45 y 70 kg, la cantidad ideal de alimento son entre 470 y 630 gramos."""

brachycephalic_nutrition = """Esta raza es braquicéfala, por lo que tienden a regurgitar la comida, debido a cuestiones fisiológicas: su tráquea es demasiado corta 
y, en ocasiones, padecen una incorrecta oclusión de su mandíbula, que les impide masticar bien el alimento. Para los braquicéfalos, se recomienda alimento especial en 
el que las croquetas tienen forma triangular, para facilitar su masticado e ingestión."""

sensitive_stomach_nutrition = """Esta raza tiene estómago sensible, por lo que se recomienda alimento especial con una gran cantidad de proteínas de alta calidad que 
favorecen su digestión y el equilibrio de la flora intestinal."""

obesity_nutrition = """Esta raza es propensa a engordar. Se recomienda que su alimento tenga: Proteína por encima del promedio, grasa por debajo del promedio,
calorías por debajo del promedio y un aporte energético equilibrado para que una pequeña cantidad pueda saciar a tu mascota."""

dental_disease_nutrition = """Esta raza tiene tendencia a tener problemas dentales. Es recomendado darle bocadillos de salud dental. Estos bocadillos tienen
una forma especial que ayuda a limpiar los dientes de tu mascota. Otra alternativa es darle un hueso o carnaza para masticar. El movimiento le ayuda a limpiar
los dientes y eliminar la placa. Lo ideal es darle alimento que no contenga azúcares adicionados para evitar las caries."""

skin_problem_nutrition = """Esta raza tiene tendencia a tener problemas de piel. Una recomendación es darle alimento especial para el cuiado de piel. Estos alimentos 
contienen ingredientes como vitaminas del tipo B, ácidos grasos Omega 3, ácidos grasos Omega 6 y vitaminas C y E."""

cat_general_nutrition = """Esta raza no tiene necesidades alimenticias especiales. ¡Puedes darle cualquier comida de calidad!"""

kitten_nutrition = """Los gatos bebés, a partir de las 8 semanas y hasta los 6 meses necesitarán entre 3 y 4 raciones al día, mientras que a partir de los 6 meses ya les puedes reducir el número de tomas a 2 diarias.De esta forma, a partir de las 8 semanas y hasta los 6 meses necesitarán entre 3 y 4 raciones al día, mientras que a partir de los 6 meses ya les puedes reducir el número de tomas a 2 diarias."""

adult_cat_nutrition = """Una vez que tu gato se convierte en adulto (cuando cumple aproximadamente 1 año), y siempre y cuando tu minino lleve una vida activa, una comida al día puede ser lo más apropiado para él.

Si por el contrario tu gato tiene tendencia al sedentarismo y a subir de peso, lo ideal es dividir su ración diaria en dos tomas al día para mantener su metabolismo activo."""

senior_cat_nutrition = """Los gatos mayores de siete años en adelante deben mantener el mismo régimen de alimentación que los adultos en cuanto a la frecuencia, y cambiar a un alimento para gatos mayores que les aporte todos los nutrientes necesarios sin el riesgo de subir de peso. En caso de que haga falta algún cambio en su dieta, deberá indicarlo un veterinario."""
