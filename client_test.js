const client = require('./client');

const sfOneClient = new client.NtripClient({
    host: '127.0.0.1',
    port: '1201',
    agent: 'NTRIP JS Client/0.2',
    authorization: 'Basic eXlkZ2lzOnl1ZGFuMjAwOA==',
    uri: 'SF01',
    console: true
});
sfOneClient.createClient();
sfOneClient.doRequest();
