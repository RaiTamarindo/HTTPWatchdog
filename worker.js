var websiteModel = require('./api/models/websiteModel.js'),
    http = require('http');

const SAMPLE_TIME = 5000;

function sendText(text)
{
    process
        .send(
        {
            text: text
        });
}

function sendData(data)
{
    process
        .send(
        {
            data: data
        });
}

function doMeasure(website)
{
    var startTime = Date.now();
    website.totalRequests++;

    try
    {
        http
            .get(website.url, function(res)
            {
                var responseTime = Date.now() - startTime,
                    statusCode = res.statusCode;
                
                if(statusCode >= 200 && statusCode < 500)
                {
                    website.successfulResponses++;
                }
                if(responseTime <= 100)
                {
                    website.fastResponses++;
                }

                sendText('[' + website.url + ']' +
                         ' successful responses: ' + website.successfulResponses +
                         ' fast responses: ' + website.fastResponses +
                         ' (last: ' + responseTime + ' ms)' +
                         ' total requests: ' + website.totalRequests);
                sendData(website);
                websiteModel.modify(website._id, website);
            })
            .on('error', function(e)
            {
                sendText(e.message);
            });
    }
    catch(e)
    {
        sendText(e.message);
    }
}

function getMeasures(websites)
{
    if(websites.length > 0)
    {
        var now = new Date();
        sendText('[' + now.toUTCString() + '] Measuring data from ' + websites.length + ' websites.');

        websites.forEach(doMeasure);
    }
    else
    {
        sendText('There are no websites to watch.');
    }
}

function loop()
{
    websiteModel
        .findAll(function(err, websites)
        {
            if(!err)
            {
                getMeasures(websites);
            }
        });
}

sendText('Running...');
setInterval(loop, SAMPLE_TIME);