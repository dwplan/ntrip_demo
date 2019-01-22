# ntrip_demo
A NodeJS demo to read Ntrip GNSS data stream

Ntrip协议 (https://wapbaike.baidu.com/item/NTRIP) 是在Internet上传输GPS，北斗等GNSS RTK数据的传输协议。这个Demo需要做一个Ntrip Server（127.0.0.1:2101）的NodeJS程序，从Ntrip Caster服务器 (http://104.42.214.164:2101/admin?mode=sources) 上同时读取下列3个数据流：
	- /SF01
	-	/SF02
	- /SF03
	
