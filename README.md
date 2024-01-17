# Test_Tasks Back End Books
## Description:
This project serves as the back end for a test task. It provides various API endpoints for managing sneakers, models,
and brands. The application is built using NestJS, a powerful framework for building scalable and maintainable
server-side applications.
I used for check on this endpoint- http://localhost:3002/.

## Installation:
Before running the application, create a .env file with the necessary environment variables, as specified in the sample
file. Then, install the dependencies and start the application:
```
yarn install

nest start --watch
```
For run application in Docker Compose with database, changed in .env file POSTGRES_HOST=postgredb and
DATABASE_URL=postgresql://root:111@postgredb:5432/temp?schema=public, and after execute next command:
```
docker compose up
# or detached
docker-compose up -d
```