var Express = require('express');
var WordNet = require('node-wordnet');

var port = process.env.PORT || 3000;

var server = Express();
var wordnet = new WordNet();

server.get('/:word', function(req, res) {
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

server.listen(port, function() {
    console.log('smartfindr_svr listening on port ' + port);
})
