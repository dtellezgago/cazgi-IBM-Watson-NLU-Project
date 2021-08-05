const express = require('express');
require("dotenv").config();

const getNLUInstance = () => {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: "2020-08-01",
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    })
    return naturalLanguageUnderstanding;
}


const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

// @GET /
app.get("/", (req, res) => {
    return res.render('index.html');
});

// @GET /url/emotions
app.get("/url/emotion", (req, res) => {

    const analyzeParams = { 'url': req.query.url, 'features': { 'entities': { 'emotion': true, 'limit': 1 } } }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
        console.log(analysisResults); 
        console.log(JSON.stringify(analysisResults.result.entities[0].emotion, null, 2)); 
        return res.send(analysisResults.result.entities[0].emotion, null, 2); 
        //return res.send(analysisResults); }) .catch(err => { return res.send("Could not do desired operation "+err); });

    });
});

// @GET /url/sentiments
app.get("/url/sentiment", (req, res) => {
    const analyzeParams = { 'url': req.query.url, 'features': { 'entities': { 'sentiment': true, 'limit': 1 } } }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
        console.log(analysisResults); 
        console.log(JSON.stringify(analysisResults.result.entities[0].sentiment, null, 2)); 
        return res.send(analysisResults.result.entities[0].sentiment, null, 2); 
        //return res.send(analysisResults); }) .catch(err => { return res.send("Could not do desired operation "+err); });

    });
});

// @GET /text/emotion
app.get("/text/emotion", (req, res) => {
    const analyzeParams = { 'text': req.query.text, 'features': { 'entities': { 'emotion': true, 'limit': 1 } } }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
        console.log(analysisResults); 
        console.log(JSON.stringify(analysisResults.result.entities[0].emotion, null, 2)); 
        return res.send(analysisResults.result.entities[0].emotion, null, 2); 
        //return res.send(analysisResults); }) .catch(err => { return res.send("Could not do desired operation "+err); });

    });
});

// @GET text/sentiment
app.get("/text/sentiment", (req, res) => {
    const analyzeParams = { 'text': req.query.text, 'features': { 'entities': { 'sentiment': true, 'limit': 1 } } }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
        console.log(analysisResults); 
        console.log(JSON.stringify(analysisResults.result.entities[0].sentiment, null, 2)); 
        return res.send(analysisResults.result.entities[0].sentiment, null, 2); 
        //return res.send(analysisResults); }) .catch(err => { return res.send("Could not do desired operation "+err); });

    });
});


let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
