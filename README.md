# Express-Server

This is a Node.js Express project built to provide a starting point for web
application development.

#### Installation

1. Clone the repository
2. Run `npm install`
3. Create a .env file in the root of the project with the following environment
   variables:

```
APP_URL=<your app URL>
PORT=<port number>
MONGO_DB_URI=<your MongoDB URI>
FOLDER=<folder path>
```

#### Run the project

```
npm run dev (Development)
npm run start (Production)
npm run test (Test)
```

#### Routes

```
POST /files
GET /files/:publicKey
DELETE /files/:privateKey
```
