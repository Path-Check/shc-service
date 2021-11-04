# Creates Smart Health Cards on the Server Side

# Deployment Overview

This repo is setup to be automatically deployed to Heroku

## 1. Make sure to generate a new key pair by calling

```
npm explore @pathcheck/shc-sdk -- npm run-script keys "$PWD"/keys
```

## 2. Upload the public key to your DOMAIN

Copy the `./keys/jwks.json` file to the `.well-known` directory of the domain you want to use to sign the QRs

## 3. Connect this GitHub repo  to Heroku

## 4. On Heroku, update the ENVIRONMENT variables to use the generated keys

```
K1 = <Your private key from ./keys/jsks.private.json>  
K1LINK = <YOUR DOMAIN NAME>
```

# Development Overview

This is a NodeJS + Express app. 

## Running

Install modules:
`npm install`

To run, do:
`npm run dev`

## Testing 

Create a new QR code using the following command

`curl -X POST -d '{"familyName": "Pamplona", "givenName": "Vitor", "dob": "1922-07-27", "vaccinationDate": "2021-09-12",  "lotNumber": "0122312"}' -H 'Content-Type: application/json' http://localhost:8000/shc`

## Generating new Version

GitHub Actions generates a new [Release](https://github.com/Path-Check/shc-service/releases) when npm version is run and pushed to the repo.

```
npm version <version number: x.x.x>
```

## Contributing

[Issues](https://github.com/Path-Check/shc-service/issues) and [pull requests](https://github.com/Path-Check/shc-service/pulls) are very welcome! :)

