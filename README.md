# Creates Smart Health Cards on the Server Side

# Deployment Overview

This repo is setup to be automatically deployed to Heroku

## 1. Create a new key pair

```
npm explore @pathcheck/shc-sdk -- npm run-script keys "$PWD"/keys
```

## 2. Upload the public key file to your DOMAIN

Copy the `./keys/jwks.json` file to the `.well-known/` directory of the domain you want to use to sign the QRs

## 3. Connect this GitHub repo to Heroku

## 4. On Heroku, update the ENV variables to use the new keys

```
K1 = <Your private key JSON from ./keys/jsks.private.json>  
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

`curl -X POST -d '{ "fhirVersion": "4.0.1" }' -H 'Content-Type: application/json' http://localhost:8000/shc`

The file `tests.http` contains examples of POST calls to the server. 

## Generating new Version

GitHub Actions generates a new [Release](https://github.com/Path-Check/shc-service/releases) when npm version is run and pushed to the repo.

```
npm version <version number: x.x.x>
```

## Contributing

[Issues](https://github.com/Path-Check/shc-service/issues) and [pull requests](https://github.com/Path-Check/shc-service/pulls) are very welcome! :)

