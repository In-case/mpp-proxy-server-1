var WebSocket = require('ws');
var wss = new WebSocket.Server({
	port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
});

wss.on('connection', function (cws, req){
	console.log(`New connection from ${req.connection.remoteAddress}`);
	var tws = new WebSocket("ws://multiplayerpiano.com:443", {
		origin:"http://multiplayerpiano.com"
	});
	var messageBuffer = [];
	tws.on('open', function(){
		for (let message of messageBuffer) tws.send(message);
		messageBuffer = undefined;
	});
	cws.on('message', function(message){
		try{
		//wssender.send('geted message, proxy ' + process.env.numberproxy + ': ' + message)
		} catch(e) {}
		if (tws.readyState == WebSocket.OPEN) tws.send(message);
		else messageBuffer.push(message);
	});
	cws.on('close', function(){
		tws.close();
		console.log(`Closing connection from ${req.connection.remoteAddress}`)
		messageBuffer = undefined;
	});
	cws.on('error', console.error);
	tws.on('message', function(message){
	try{
		//wssender.send('geted message, proxy ' + process.env.numberproxy + ': ' + message)
	} catch(e) {}
		if (cws.readyState == WebSocket.OPEN) cws.send(message);
	});
	tws.on('close', function(){
		cws.close();
	});
	tws.on('error', console.error);
	});

