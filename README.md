# Secret Server API
An API to store and retrieve secrets via a random generated hash. All of the generated secrets may have a TTL and/or a maximum view count. If either exceeds the given threshold, the secret will be unobtainable. 

## How to run
1. Set up the .env file.
2. <code>npm install</code>
3. <code>npm start</code>
   
## Environment variables
- PORT - Port for the server to listen on
- PRIVATE_KEY - Private RSA key for encryption

## Generate RSA key, if you don't have one
- <code>npm run generate-rsa-key</code>

## Endpoints
- GET /v1/swagger - Swagger page
- GET /v1/secret/:hash - Retrieve a secret by hash
- POST /v1/secret - Add a new secret

## Features
- Encrypting the secret's message with RSA
- Responses are in JSON, XML or YAML which could be set via Accept header. If no Accept header is present, default response type is JSON.

### Detailed usage documentation is in the Swagger docs.