# Extend the official Rasa SDK image
FROM python:3.8-slim-buster

# Use subdirectory as working directory
WORKDIR /app

# Copy any additional custom requirements, if necessary (uncomment next line)
COPY . .

# Change back to root user to install dependencies
USER root

# Install extra requirements for actions code, if necessary (uncomment next line)
RUN pip install -r requirements.txt


# By best practices, don't run the code with root user
USER 1001
CMD rasa run --cors "*" --model models/20210907-184826.tar.gz