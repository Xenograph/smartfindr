var Express = require('express');
var WordNet = require('node-wordnet');
var https = require('https');

var port = process.env.PORT || 3000;

var server = Express();
var wordnet = new WordNet();

var apiKey = "INSERT YOUR API KEY HERE";

server.get('/synonyms/:word', function(req, res) {
    wordnet.lookup(req.params.word, function(results) {
        var synonyms = new Set();
        results.forEach(function(result) {
            result.synonyms.forEach(function(synonym) {
                synonyms.add(synonym.replace(/[_-]/g, ' ').replace(/\(.*\)/g, ''));
            });
        });
        res.send([...synonyms]);
    });
});

server.get('/keywords', function(req, res) {
   var url = req.query.url;
   var watsonRequest = "https://gateway-a.watsonplatform.net/calls";
   watsonRequest = watsonRequest + "/url/URLGetRankedKeywords?maxRetrieve=10&outputMode=json&apikey=";
   watsonRequest = watsonRequest + apiKey + "&url=" + url;
   https.get(watsonRequest, function(watsonResult) {
        watsonResult.setEncoding('utf8');
        watsonResult.on('data', function (chunk) {
            res.send(JSON.parse(chunk));
        });
   });
});

server.listen(port, function() {
    console.log('smartfindr_svr listening on port ' + port);
})
