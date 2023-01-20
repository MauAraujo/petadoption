# Pet Adoption
This web application was created originally in 2019 to help nonprofit animal adoption foundations in Mexico automate certain parts of their adoption process, to help them reduce load on their volunteer team.

The solution was conceived to be an animal catalog with instant search (powered by [MeiliSearch](https://www.meilisearch.com/)) where people could find animals currently looking for a home, which could be filtered instantly to find certain breeds, sizes, unique characteristics, etc. that would help the animal find a suitable home.


![image](https://user-images.githubusercontent.com/19579265/213796855-3ec42b2f-ff92-47f9-957f-5e13338ea9cc.png)


![image](https://user-images.githubusercontent.com/19579265/213796144-2ec0444b-c91e-4ea8-84cb-e9a2512d5736.png)


![image](https://user-images.githubusercontent.com/19579265/213796148-ed428f78-c485-44ee-b122-2da44486d3c6.png)


# AI Assistant
In addition, the site includes an AI assistant (powered by Rasa(https://rasa.com/)) which answers common questions about animal care. The idea behind this is to divert the most common questions to an assistant and help the volunteer team save their precious time for other, more pressing tasks. 

The site includes all the information in form of articles and the assistant helps by giving concise answers. The assistant was trained to give a tailored response depending on the breed of the cat or dog the user asks about. It will respond with information about common problems, nutrition tips and breed-specific instructions. 

![image](https://user-images.githubusercontent.com/19579265/213796170-703e1e01-736a-45c2-b1c0-1662fc02c838.png)
![image](https://user-images.githubusercontent.com/19579265/213796204-8fbb132f-20e8-45b8-8c28-18bede605608.png)


# Design
The web application is designed with purely open-source tools, using:
- [Meilisearch](https://www.meilisearch.com/) for instant search
- [MongoDB Community Edition](https://www.mongodb.com/) for storing animal records
- [MinIO](https://min.io/) as an object store for all images in the site and user-uploaded images
- [Rasa](https://rasa.com/) For training the assistant
- [Thumbor](https://www.thumbor.org/) for on-demand image resizing and cropping

The only part which is not open souce is the [EmailJS](https://www.emailjs.com/) integration.

Using a mostly open source stack makes the operation costs as cheap as possible, and provides the ability to self-host, making it easy to deploy on volunteer-run servers.

A rough diagram of the application: 

![image](https://user-images.githubusercontent.com/19579265/213796224-99098824-1220-4b17-ab8d-1c2d68bc2f07.png)

# Notes from the Team
This application was made a few years ago when the team was beginning to work on web applications, so it contains certain practices that might not hold up to the best standard today. However, the code is now open sourced to keep a record of the progress the team has made since then, and to showcase the design and ideas which were incredible at the time. We also hope this project can inspire other initiatives to help nonprofit foundations using open source software.

