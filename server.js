var childProcess = require('child_process');

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

runWorker();

