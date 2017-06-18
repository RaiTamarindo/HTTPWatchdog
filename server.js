var childProcess = require('child_process'),
    worker = childProcess.fork('./worker.js'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    routes = require('api/routes');


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
    // TODO
});

// REST API
routes(app);

app.listen(port, function()
{
    console.log('Listening at port ' + port);
});

