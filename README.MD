node, express, mongodb backend for survey application

requires .env file in root directory to work properly

docker usage:

sudo docker build -t back-end .

sudo docker run -p 3001:3001 back-end:latest