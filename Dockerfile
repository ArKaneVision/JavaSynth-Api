FROM node:10
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Configure the working directory
RUN mkdir -p /app 
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
COPY . ./

EXPOSE 8080
CMD [ "yarn", "start" ]