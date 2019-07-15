var websiteModel = require('./api/models/websiteModel.js'),
    https = require('https'),
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
    var startDate = Date.now();
    website.totalRequests++;

    try
    {
        const httpClient = website.url.startsWith('https://') ? https : http;
        httpClient
            .get(website.url, function(res)
            {
                website.lastResponseDate = Date.now();
                website.lastResponseTime = website.lastResponseDate - startDate;
                website.lastStatusCode = res.statusCode;
                if(website.lastStatusCode >= 200 && website.lastStatusCode < 500)
                {
                    website.successfulResponses++;
                }
                if(website.lastResponseTime <= 400)
                {
                    website.fastResponses++;
                }
                
                sendData(website);
                websiteModel.modify(website._id, website);
                sendText('[' + website.url + ']' +
                         ' successful responses: ' + website.successfulResponses +
                         ' fast responses: ' + website.fastResponses +
                         ' (last: ' + website.lastResponseTime + ' ms)' +
                         ' total requests: ' + website.totalRequests);
            })
            .on('error', function(e)
            {
                website.lastStatusCode = -1;
                sendData(website);
                websiteModel.modify(website._id, website);
                sendText(e.message);
            });
    }
    catch(e)
    {
        website.lastStatusCode = -1;
        sendData(website);
        websiteModel.modify(website._id, website);
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