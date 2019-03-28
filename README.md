# ntrip_demo
A NodeJS demo to read Ntrip GNSS data stream



Ntrip协议 (https://wapbaike.baidu.com/item/NTRIP) 是在Internet上传输GPS，北斗等GNSS RTK数据的传输协议。这个Demo需要做一个Ntrip Server（127.0.0.1:2101）和Ntrip Client的NodeJS程序。

任务1： 从Ntrip Caster服务器 (http://104.42.214.164:2101/admin?mode=sources) 上**同时读取**下列3个数据流:

- /SF01
- /SF02
- /SF03

读取其中一个数据流的样例code如下：

```javascript
var ds = require('net').Socket();

ds.connect(2101,"104.42.214.164")
 
var mountString = "GET SF01 HTTP/1.1\r\nUser-Agent: NTRIP JS Client/0.2\r\nAuthorization: Basic eXlkZ2lzOnl1ZGFuMjAwOA==\n\n";

ds.write(mountString);
```

任务2：任务1中读取的3个数据流存储下来之后，再做一个Ntrip Client连接这个服务器(127.0.0.1:2101)去读取SF01,SF02,SF03的数据。

任务3：用C++和Boost C++ Libraries里面的 ASIO 库，实现任务1和任务2，其中任务2不需要存储，只要发起一个Ntrip client去读取任务1中抓到的二进制数据流
    - Boost.Asio库 网址：https://theboostcpplibraries.com/boost.asio
    - JS代码可供参考
    - 写下思路或者更可能多的代码