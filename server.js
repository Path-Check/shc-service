const express = require("express");
const SHC = require("@pathcheck/shc-sdk");

const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || "8000";

const privateKey = process.env.K1
  ? JSON.parse(process.env.K1)
  : { // DEMO KEYS
    "kty": "EC",
    "kid": "RtNFRifHI_nsVNYwpZbB8i0ZqBsjtAI_sjCiyh8fzV8",
    "use": "sig",
    "alg": "ES256",
    "x5c": [],
    "crv": "P-256",
    "x": "-YrUDl5O6LBdmVEEfxw4Ml5trO3IuAzeCnASbxSYowc",
    "y": "E67zIYdV78qz-xAn0dIc0vQWzYEn9RG6OUN2RIL6GQo",
    "d": "XI7SFgM8Attzb0Kxa145OxgfjjezmGpHd3AhE2PePlA"
    };

const publicKeyLink = process.env.K1LINK || "https://pcf.pw"; // DEMO URL

app.post("/shc", async function (req, res) {
  let inputs = {
    familyName: req.body.familyName,
    givenName: req.body.givenName,
    dob: req.body.dob,
    vaccinationDate: req.body.vaccinationDate, 
    lotNumber: req.body.lotNumber
  };

  let FHIRPayload = {
    type: [
      "https://smarthealth.cards#health-card",
      "https://smarthealth.cards#immunization",
      "https://smarthealth.cards#covid19",
    ],
    credentialSubject: {
      fhirVersion: "4.0.1",
      fhirBundle: {
        resourceType: "Bundle",
        type: "collection",
        entry: [
          {
            fullUrl: "resource:0",
            resource: {
              resourceType: "Patient",
              name: [
                {
                  family: inputs.familyName,
                  given: [inputs.givenName],
                },
              ],
              birthDate: inputs.dob,
            },
          },
          {
            fullUrl: "resource:1",
            resource: {
              resourceType: "Immunization",
              status: "completed",
              vaccineCode: {
                coding: [
                  {
                    system: "http://hl7.org/fhir/sid/cvx",
                    code: "207",
                  },
                ],
              },
              patient: {
                reference: "resource:0",
              },
              occurrenceDateTime: inputs.vaccinationDate,
              performer: [
                {
                  actor: {
                    display: "ABC General Hospital",
                  },
                },
              ],
              lotNumber: inputs.lotNumber,
            },
          },
        ],
      },
    },
  };

  const jwt = await SHC.makeJWT(FHIRPayload, 48, publicKeyLink);
  const qrUri = await SHC.signAndPack(jwt, privateKey);

  let returnPayload = {
    qr: qrUri,
  };
  res.send(returnPayload);
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});


//curl -X POST -d '{"familyName": "Pamplona", "givenName": "Vitor", "dob": "1922-07-27", "vaccinationDate": "2021-09-12",  "lotNumber": "0122312"}' -H 'Content-Type: application/json' http://localhost:8000/shc

    