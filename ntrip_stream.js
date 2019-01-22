const { Readable, Writable } = require('stream');
const ReadLen = 1000;

class NtripRead extends Readable {
    constructor(client) {
        super()

        this._index = 0;
        this._client = client;
    }

    _read() {
        let tmpBuf = this._client.read(this._index, ReadLen);
        if (tmpBuf.length > 0) {
            this._index += tmpBuf.length;
            this.push(tmpBuf);
        } else {
            this.loopRead();
        }
    }

    async loopRead() {
        while (true) {
            await this.sleep(100);
            let tmpBuf = this._client.read(this._index, ReadLen);
            if (tmpBuf.length > 0) {
                this._index += tmpBuf.length;
                this.push(tmpBuf);
                return
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => {
            setTimeout(() =>{
                resolve();
            }, ms);
        })
    }
}


module.exports = {NtripRead}
