var childProcess = require('child_process'),
    worker = childProcess.fork('./worker.js'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3000,
    routes = require('./api/routes.js');

console.log('HTTP Watchdog');
console.log('A website availability monitoring application.');
console.log('');
console.log('Running server...');

// Worker thread
worker.on('error', function(err)
{
    // TODO
});

worker.on('exit', function(code)
{
    // TODO
});

worker.on('message', function(msg)
{
    if(msg.text)
    {
        console.log('Worker: ' + msg.text);
    }
    if(msg.data)
    {
        //TODO: Inserts new stats on database and emit socket event

    }
});

// Webapp
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// REST API
routes(app);

app.listen(port, function()
{
    console.log('Listening at port ' + port);
});

