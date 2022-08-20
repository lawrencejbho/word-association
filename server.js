require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const axios = require("axios");

app.get("/api/associations/:word", (req, res) => {
  // Body parameters for the API
  const encodedParams = new URLSearchParams();
  encodedParams.append("indent", "yes");
  encodedParams.append("lang", "en");
  encodedParams.append("limit", "50");
  encodedParams.append("pos", "noun,adjective,verb,adverb");
  encodedParams.append("text", req.params.word); // can grab the :word in the URI to be used here
  encodedParams.append("type", "stimulus");

  const options = {
    method: "POST",
    url: "https://wordassociations-word-associations-v1.p.rapidapi.com/json/search",
    params: { apikey: process.env.API_KEY },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "wordassociations-word-associations-v1.p.rapidapi.com",
    },
    data: encodedParams,
  };

  // modified this to use data.response
  const request = axios
    .request(options)
    .then(function (response) {
      // console.log(response.data.response);
      res.json(response.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
