
const SAMPLE_TIME = 5000;

function getMeasure()
{
    var now = new Date();
    process
        .send(
        {
            text: '[' + now.toUTCString() + '] Measuring data...'
        });
}

process.send({text: 'Running...'});
setInterval(getMeasure, SAMPLE_TIME);