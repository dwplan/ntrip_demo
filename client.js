const net = require('net');


class NtripClient {
    constructor(options) {
        this._host = options.host || '';
        this._port = options.port || '';
        this._agent = options.agent || '';
        this._authorization = options.authorization || '';
        this._uri = options.uri || '';
        this._buf = Buffer.alloc(0);
        this._console = options.console || false;
        this._client = null;
    }

    createClient() {
        if (!this._host || !this._port || !this._agent || !this._authorization || !this._uri) {
            throw('参数错误，无法创建连接');
        }

        const client = net.createConnection({ port: this._port, host: this._host }, () => {
        });
        this._client = client;
        client.on('data', (data) => {
            if (this._console) {
                console.log(data.toString());
            }
            let tmpBuf = Buffer.from(data);
            this._buf = Buffer.concat([this._buf, tmpBuf]);
            if (this._console) {
                console.log(this._buf.length);
            }
        });
        client.on('end', () => {
        });
        client.on('error', (err) => {
        });
    }

    read(start, len) {
        let bufLen = this._buf.length;
        let tmpLen = len;
        if (bufLen - start < tmpLen) {
            tmpLen = bufLen - start;
        }
        let tmpBuf = new Buffer(tmpLen);
        this._buf.copy(tmpBuf, 0, start, start + tmpLen);
        return tmpBuf;
    }

    async doRequest() {
        if (this._client === null) {
            return
        }
        const uri = this._uri;
        const userAgent = this._agent;
        const authorization = this._authorization;
        const data = `GET ${uri} HTTP/1.1\r\nUser-Agent: ${userAgent}\r\nAuthorization: ${authorization}\n\n`;
        this._client.write(data);
    }
}

module.exports = {NtripClient}

