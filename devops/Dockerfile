FROM node:8-alpine
WORKDIR /home
COPY package.json /home
RUN npm install
COPY . /home
RUN npm run build
EXPOSE 9001
CMD ["npm", "run", "start"]
