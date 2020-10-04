FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN rm -f .env

RUN echo NEXT_PUBLIC_API_URL=http://localhost:8080 > .env.local

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]