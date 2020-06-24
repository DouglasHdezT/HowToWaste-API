# Dockerfile of HowToWaste API
FROM node

WORKDIR /home
RUN mkdir nodeAPI

WORKDIR /home/nodeAPI

CMD ["bash -c", "npm i; npm start"]