var http = require('http');
var md5 = require('MD5');

httpServer = http.createServer(function(req, res){
	console.log("One user is seeing the page");
	res.end('Hello World');
});
httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);
var lastId = 0;
var users = [];
var direction = "toRight";

io.sockets.on('connection', function(socket){
	/*Server is ONLINE*/
});

io.sockets.on('connection', function(socket){
	
	var user = new User(nextId());
	socket.user = user;
	users.push(user);
	console.log(user.id);
	socket.emit("userCreated", lastId);
	
	socket.on("ballOnLimitForUser", function(id){
		console.log("ball onlimit for user " + id);
		
		if(direction == "toRight"){
			if(theSocket = getSocketByUserId(io.sockets.sockets, id+1)){
				theSocket.emit("launchBall", "toRight");
			}
			else{
				switchDirection();
				socket.emit("launchBall", "toLeft");
			}
		}
		else if(direction == "toLeft"){
			if(theSocket = getSocketByUserId(io.sockets.sockets, id-1)){
				theSocket.emit("launchBall", "toLeft");
			}
			else{
				switchDirection();
				socket.emit("launchBall", "toRight");
			}
		}
	});
	
});

function getUserById(users, id){
	for(var i = 0; i < users.length; i++){
		if(users[i].id == id){
			return user;
		}
	}
	return false;
}

function getSocketByUserId(sockets, id){
	for(var i = 0; i < sockets.length; i++){
		if(user = sockets[i].user){
			if(user.id == id){
				return sockets[i];
			}
		}
	}
	return false;
}

function User(id){
	
	this.id = id;
	
}

function nextId(){
	
	lastId ++;
	return lastId;

}

function switchDirection(){
	if(direction == "toRight"){
		direction = "toLeft";
	}
	else{
		direction = "toRight";
	}
	return direction;
}