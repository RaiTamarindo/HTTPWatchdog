var websiteModel = require('./api/models/websiteModel.js'),
    https = require('https'),
    http = require('http');

const SAMPLE_TIME = 2000;
const MAX_SAMPLES = 1800; // last hour

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

function doMeasure(website) {
    
    try
    {
        const url = new URL(website.url);
        const httpClient = url.protocol === 'https:' ? https : http;
        const options = {
            method: 'GET',
            host: url.host,
            path: url.pathname,
        };
        if (website.schema === 'Basic' && !!website.username) {
            options.auth = `${website.username}:${website.password}`;
        }
        if (website.schema === 'Bearer' && !!website.token) {
            options.headers = {
                'Authorization': `Bearer ${website.token}`
            };
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
                    if(website.lastStatusCode >= 200 && website.lastStatusCode < 300) {
                        website.successfulResponses++;
                    }
                    if(website.lastResponseTime <= 200) {
                        website.fastResponses++;
                    }

                    if (!website.responses) {
                        website.responses = [];
                    }
                    website.responses.push({
                        status: website.lastStatusCode,
                        time: website.lastResponseTime,
                        timestamp: website.lastResponseDate
                    });
                    if (website.responses.length > MAX_SAMPLES) {
                        const removed = website.responses.shift();
                        if(removed.status >= 200 && removed.status < 300) {
                            website.successfulResponses--;
                        }
                        if(removed.time <= 200) {
                            website.fastResponses--;
                        }
                    }
                    website.totalRequests = website.responses.length;
                    
                    sendData(website);
                    websiteModel.modify(website._id, website);
                    sendText(`
                    [${website.url}]
                    successful responses: ${website.successfulResponses}
                    fast responses: ${website.fastResponses}
                    (last: ${website.lastResponseTime} ms)
                    total requests: ${website.totalRequests}
                    `);
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
    } catch(e) {
        website.lastStatusCode = -1;
        sendData(website);
        websiteModel.modify(website._id, website);
        sendText(e.message);
    }
}

function getMeasures(websites) {
    if(websites.length > 0) {
        const now = new Date();
        sendText('[' + now.toUTCString() + '] Measuring data from ' + websites.length + ' websites.');

        websites.forEach(doMeasure);
    } else {
        sendText('There are no websites to watch.');
    }
}

function loop() {
    websiteModel
        .findAll((err, websites) => {
            if(!err) {
                getMeasures(websites);
            }
        });
}

sendText('Running...');
setInterval(loop, SAMPLE_TIME);