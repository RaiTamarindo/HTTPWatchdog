var childProcess = require('child_process'),
    mongoClient = require('mongodb').MongoClient;

function runWorker()
{
    var process = childProcess.fork('./worker.js');

    process.on('error', function(err)
    {
        // TODO do stuff
    });

    process.on('exit', function(code)
    {
        // TODO do stuff
    });
}

function setupServer()
{
    var url = 'mongodb://localhost:27017/http-watchdog';

    mongoClient.connect(url, function(err, db)
    {
        console.log("Connected successfully to server");

        db.close();
    });
}

console.log('HTTP Watchdog');
console.log('A website availability monitoring application.');
console.log('');
console.log('Running server...');

setupServer();
runWorker();

