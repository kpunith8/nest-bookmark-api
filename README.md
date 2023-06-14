## Description

NestJS bookmark API App using PostgreSQL, Prisma

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Generating modules 

Generating user module using CLI
```bash
nest g module user
```

## PostgreSQL as a DB 

Use docker to spinup postgreSQL 
```bash
docker compose up dev-db -d
```

Check whether container is up 
```bash
docker ps -a 
docker logs <container-id> # To check the logs
```

## Prisma as an ORM

Install `prisma` as a dev dependency and `@prisma/client` as a dependecy
```bash
npm i -D prisma

npm i @prisma/client
```

Initialise prisma
```bash
npx prisma init
```
Which generates `.env` file where we need to update the postgreSQL URL to point to docker port,  
username, and password and also generates `prisma/schema.prisma` file where we need to create schemas.

Create `User` and `Bookmark` schemas in `prisma/schema.prisma` file 

Create migrations from the schema added, which creates tables in postgreSQL DB
```bash
npx prisma migrate dev
```

Generate types for the schema using,
```bash
npx prisma generate
```
We can now import the `User` and `Bookmark` types in services or controllers.

## NestJS Config module 

Install `@nestjs/config` module and is implemented on the root module i.e., in `app.module.ts` 
```bash
npm install @nestjs/config
```

## Authentication and Authorization

For authentication, use `passport` provided by nestJS using JWT (https://jwt.io to decode the JWT tokens).

Install `@nestjs/passport, passport, passport-local, @nestjs/jwt, and passport-jwt` as deps 
and `@types/passport-local and @types/passport-jwt` as dev deps.
```bash
npm i @nestjs/passport passport passport-local @nestjs/jwt passport-jwt
npm i -D @types/passport-local @types/passport-jwt
```

Use `passport JWT stragegy` and use `Guards` to guard a route.
```js
@UseGuards(AuthGuard('jwt'))
@Get('me')
getUserDetails() {}
```

To access authenticated routes we need to pass `Authorization` header in the request as,
```
Bearer <jwt-auth-token-generated-while-logging-in> 
```