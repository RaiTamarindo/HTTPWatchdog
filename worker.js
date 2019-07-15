var websiteModel = require('./api/models/websiteModel.js'),
    https = require('https'),
    http = require('http');

const SAMPLE_TIME = 5000;

function sendText(text) {
    process.send({ text: text });
}

function sendData(data) {
    process.send({ data: data });
}

function getDuration(t1, t0) {
    if (!t0) {
        t0 = [0, 0];
    }

    return t1[0]*1000 + t1[1]/1000000 - t0[0]*1000 - t0[1]/1000000;
}

function doMeasure(website)
{
    website.totalRequests++;
    
    try
    {
        const url = new URL(website.url);
        const httpClient = url.protocol === 'https:' ? https : http;
        const options = {
            method: 'GET',
            host: url.host,
            path: url.pathname,
        };
        if (!!website.username) {
            options.auth = `${website.username}:${website.password}`;
        }
        const timings = {
            tcpConnectionAt: undefined,
            tlsHandshakeAt: undefined,
            firstByteAt: undefined,
        };
        const req = httpClient
            .request(options, (res) => {
                res.once('readable', () => {
                    const now = process.hrtime();
                    website.lastResponseDate = getDuration(now);
                    website.lastResponseTime = getDuration(now, timings.tlsHandshakeAt || timings.tcpConnectionAt);

                    website.lastStatusCode = res.statusCode;
                    if(website.lastStatusCode >= 200 && website.lastStatusCode < 500)
                    {
                        website.successfulResponses++;
                    }
                    if(website.lastResponseTime <= 200)
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
            });
        req.on('socket', (socket) => {
            socket.on('connect', () => {
                timings.tcpConnectionAt = process.hrtime();
            });
            socket.on('secureConnect', () => {
                timings.tlsHandshakeAt = process.hrtime();
            });
        });
        req.on('error', (e) => {
            website.lastStatusCode = -1;
            sendData(website);
            websiteModel.modify(website._id, website);
            sendText(e.message);
        });
        req.end();
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