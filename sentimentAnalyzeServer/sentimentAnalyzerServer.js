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


// initializing NLU instance
const NLU = getNLUInstance();

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
    const url = req.query.url;
    console.log("RESPONSE =====> ",url);

    const params = {
        'url': url,
        'features': {
            "emotion": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => res.send(response.result))
        .catch(error => {
            console.log("error in respones", error)
            return res.status(500).send({ success: false, message: "something went wrong" })
        });
});

// @GET /url/sentiments
app.get("/url/sentiment", (req, res) => {
     const url = req.query.url;
     console.log("RESPONSE =====> ", url);
     
     const params = {
         'url': url,
         'features': {
             "sentiment": {
                'document': true
            }
        }
    }
    
    NLU.analyze(params)
    .then(response => res.send(response.result))
        .catch(error => {
            console.log("error in respones", error)
            return res.status(500).send({ success: false, message: "something went wrong" })
        });
    });
    
    // @GET /text/emotion
    app.get("/text/emotion", (req, res) => {
        const text = req.query.text;
        
    const params = {
        'text': text,
        'features': {
            "emotion": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => res.send(response.result))
        .catch(error => {
            console.log("error in respones", error)
            return res.status(500).send({ success: false, message: "something went wrong" })
        });
});

// @GET text/sentiment
app.get("/text/sentiment", (req, res) => {
    const text = req.query.text;
    
    const params = {
        'text': text,
        'features': {
            "sentiment": {
                'document': true
            }
        }
    }

    NLU.analyze(params)
        .then(response => res.send(response.result))
        .catch(error => {
            console.log("error in respones", error)
            return res.status(500).send({ success: false, message: "something went wrong" })
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

// const express = require('express');
// const dotenv = require('dotenv')
// const nluInstance = require('./Middleware/IBMNewInstanceCreator')
// dotenv.config()

// const app = new express();

// app.use(express.static('client'))

// const cors_app = require('cors');
// app.use(cors_app());

// app.get("/",(req,res)=>{
//     res.render('index.html');
//   });

// app.get("/url/emotion", (req,res) => {
//     const querytext = req.query.url
//     const newinstance = nluInstance
//     const analyzeparams = {
//         'url': querytext,
//         'features': {
//             'entities' : {
//                 'emotion' : true,
//                 'sentiment': false
//             }, 'keywords': {
//                 'emotion': true,
//                 'sentiment': false

//             }
//         } 
//     }

//     newinstance.analyze(analyzeparams).then(analysisresults =>
//         {
//            const emotionalanalysis = analysisresults.result.entities[0].emotion
//             return res.send({emotions: emotionalanalysis});
//         }).catch( err =>
//             {
//                 console.log(err)
//             })
// });

// app.get("/url/sentiment", (req,res) => {
//     const querytext = req.query.url
//     const newinstance = nluInstance
//     let sentimentresponse
//     const analyzeparams = {
//         'url': querytext,
//         'features': {
//             'entities' : {
//                 'sentiment' : true,
//                 'emotion'  : false
//             }, 'keywords': {
//                 'sentiment': true,
//                 'emotion': false

//             }
//         } 
//     }

//     newinstance.analyze(analyzeparams).then(analysisresults =>
//         {
//             console.log(JSON.stringify(analysisresults, null, 2))
//             sentimentresponse = analysisresults.result.entities[0].sentiment.label
//             return res.send({senti: sentimentresponse});
//         }).catch( err =>
//             {
//                 console.log(err)
//             })
// });

// app.get("/text/emotion", (req,res) => {
//     const querytext = req.query.text
//     const newinstance = nluInstance
//     const analyzeparams = {
//         'text': querytext,
//         'features': {
//             'entities' : {
//                 'emotion' : true,
//                 'sentiment': false
//             }, 'keywords': {
//                 'emotion': true,
//                 'sentiment': false

//             }
//         } 
//     }

//     newinstance.analyze(analyzeparams).then(analysisresults =>
//         {
//             const emotionalanalysis = analysisresults.result.entities[0].emotion
//             return res.send({emotions: emotionalanalysis});
//         }).catch( err =>
//             {
//                 console.log(err)
//             })
// });

// app.get("/text/sentiment", (req,res) => {
//     const querytext = req.query.text
//     const newinstance = nluInstance
//     const analyzeparams = {
//         'text': querytext,
//         'features': {
//             'entities' : {
//                 'sentiment' : true,
//                 'emotion'  : false
//             }, 'keywords': {
//                 'sentiment': true,
//                 'emotion': false

//             }
//         } 
//     }

//     newinstance.analyze(analyzeparams).then(analysisresults =>
//         {
//             console.log(JSON.stringify(analysisresults, null, 2))
//             const sentimentresponse = analysisresults.result.entities[0].sentiment.label
//             return res.send({senti: sentimentresponse});
//         }).catch( err =>
//             {
//                 console.log(err)
//             })
// });

// let server = app.listen(8080, () => {
//     console.log('Listening', server.address().port)
// })