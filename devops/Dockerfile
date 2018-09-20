FROM node:8-alpine
RUN apk add --update git && rm -rf /tmp/* /var/cache/apk/*
WORKDIR /home
COPY package.json /home
RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install
RUN apk del .gyp
COPY . /home
RUN npm run build
EXPOSE 9001
CMD ["npm", "run", "start"]
