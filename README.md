# Creates Smart Health Cards on the Server Side

# Development Overview

This is a NodeJS + Express app

## Running

Install modules:
`npm install`

To run, do:
`npm run dev`

## Testing 

Create a new QR code using the following command

`curl -X POST -d '{familyName: "Pamplona", givenName: "Vitor", dob: "1922-07-27", vaccinationDate: "2021-09-12",  lotNumber: "0122312"}' -H 'Content-Type: application/json' http://localhost:8000/shc`


## Generating new Version

GitHub Actions generates a new [Release](https://github.com/Path-Check/shc-service/releases) when npm version is run and pushed to the repo.

```
npm version <version number: x.x.x>
```

## Contributing

[Issues](https://github.com/Path-Check/shc-service/issues) and [pull requests](https://github.com/Path-Check/shc-service/pulls) are very welcome! :)

