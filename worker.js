
const SAMPLE_TIME = 5000;

function getMeasure()
{
    var now = new Date();
    process.send('[' + now.toUTCString() + '] Measuring data...');
}

process.send('Running...');
setInterval(getMeasure, SAMPLE_TIME);