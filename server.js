const net = require('net');
const {NtripRead} = require('./ntrip_stream');
const client = require('./client');

const sfOneClient = new client.NtripClient({
    host: '104.42.214.164',
    port: '2101',
    agent: 'NTRIP JS Client/0.2',
    authorization: 'Basic eXlkZ2lzOnl1ZGFuMjAwOA==',
    uri: 'SF01',
});
sfOneClient.createClient();
const sfTwoClient = new client.NtripClient({
    host: '104.42.214.164',
    port: '2101',
    agent: 'NTRIP JS Client/0.2',
    authorization: 'Basic eXlkZ2lzOnl1ZGFuMjAwOA==',
    uri: 'SF02'
});
sfTwoClient.createClient();
const sfThreeClient = new client.NtripClient({
    host: '104.42.214.164',
    port: '2101',
    agent: 'NTRIP JS Client/0.2',
    authorization: 'Basic eXlkZ2lzOnl1ZGFuMjAwOA==',
    uri: 'SF03'
});
sfThreeClient.createClient();

const promises = [sfOneClient, sfTwoClient, sfThreeClient].map((c) => {
    return c.doRequest();
});

Promise.all(promises).then((rs) => {
}).catch((e) => {
});


const server = net.createServer((socket) => {
    let chunk = Buffer.alloc(0);
    let isDataOk = false;
    socket.on('data', (data) => {
        if (isDataOk) {
            return;
        }
        chunk = Buffer.concat([chunk, data]);
        let chunkStr = chunk.toString();
        if (/\n\n/.test(chunkStr)) {
            isDataOk = true;

            // 忽略数据验证
            let r = /SF0[1-3]/.exec(chunkStr);
            if (r) {
                sendData(socket, r[0])
            }
        }
    });

    socket.on('end', () => {
        console.log(chunk.toString());
    });

    socket.on('error', (err) => {
        console.log(err);
    });
}).on('error', (err) => {
    console.log(err);
});

function sendData(socket, url) {
    let c = null;
    switch (url) {
        case 'SF01':
            c = sfOneClient;
            break;
        case 'SF02':
            c = sfTwoClient;
            break;
        case 'SF03':
            c = sfThreeClient;
            break;
    }
    if (c === null) {
        socket.end('Unkown url');
        return;
    }
    const readStream = new NtripRead(c);
    readStream.pipe(socket);
}

server.listen({port: 1201, host: '127.0.0.1'});
