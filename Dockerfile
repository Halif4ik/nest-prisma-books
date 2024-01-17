FROM node:20.6.1
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

COPY . .
# run ony once to generate image
RUN npm i
RUN npm run build
RUN ls


# run every time when container is started
CMD npm run prisma:generate && npm run prisma:migrate:dev && npm run start:dev

