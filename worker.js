
const SAMPLE_TIME = 5000;

function getMeasure()
{
    console.log('Measuring data...');
}

console.log('Running worker thread...');
setInterval(getMeasure, SAMPLE_TIME);