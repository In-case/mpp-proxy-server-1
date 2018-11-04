var WebSocket = require('ws');
var wss = new WebSocket.Server({
	port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
});
var wss1 = new WebSocket.Server({
	port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080
});

wss.on('connection', function (cws, req){
	console.log(`New connection from ${req.connection.remoteAddress}`);
	var tws = new WebSocket("ws://www.multiplayerpiano.com:443", {
		origin:"http://www.multiplayerpiano.com"
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
wss1.on('connection', function (cws1, req1){
	console.log(`New connection from ${req1.connection.remoteAddress}`);
	var tws1 = new WebSocket("ws://23.95.115.204:8080", {
		origin:"http://mpp.terrium.net"
	});

	// client to server
	var messageBuffer = [];
	tws1.on('open', function(){
		for (let message of messageBuffer) tws1.send(message);
		messageBuffer = undefined;
	});
	cws1.on('message', function(message){
		try{
		//wssender.send('geted message, proxy ' + process.env.numberproxy + ': ' + message)
		} catch(e) {}
		if (tws1.readyState == WebSocket.OPEN) tws1.send(message);
		else messageBuffer.push(message);
	});
	cws1.on('close', function(){
		tws1.close();
		console.log(`Closing connection from ${req1.connection.remoteAddress}`)
		messageBuffer = undefined;
	});
	cws1.on('error', console.error);
	// server to client
	tws1.on('message', function(message){
	try{
		//wssender.send('geted message, proxy ' + process.env.numberproxy + ': ' + message)
	} catch(e) {}
		if (cws1.readyState == WebSocket.OPEN) cws1.send(message);
	});
	tws1.on('close', function(){
		cws1.close();
	});
	tws1.on('error', console.error);
});
