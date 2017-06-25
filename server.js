var childProcess = require('child_process'),
    worker = childProcess.fork('./worker.js'),
    express = require('express'),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    validators = require('./api/helpers/validators'),
    app = express(),
    port = process.env.PORT || 3000,
    server = app.listen(port),
    io = require('socket.io').listen(server),
    socket = require('./socket')(io),
    routes = require('./api/routes');

console.log('HTTP Watchdog');
console.log('A website availability monitoring application.');
console.log('');
console.log('Running server...');
console.log('Listening at port ' + port);

// Socket client connection
io.on('connection', function()
{
    console.log('A client connected.');
    socket.registerListeners();
});

// Worker thread
worker.on('error', function(err)
{
    console.log('Worker failed. ' + err);
});

worker.on('exit', function(code)
{
    console.log('Worker stoped.');
    console.log('Trying start again.');
    worker = childProcess.fork('./worker.js');
});

worker.on('message', function(msg)
{
    if(msg.text)
    {
        console.log('Worker: ' + msg.text);
    }
    if(msg.data)
    {
        socket.sendWebsiteUpdate(msg.data);
    }
});

// Webapp
app.use(express.static(__dirname + '/public'));

// REST API
app.use(bodyParser.json());
app.use(validator({customValidators:validators}));
routes(app);
