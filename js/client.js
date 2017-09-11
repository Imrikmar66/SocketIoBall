//Connection au serveur ici
var socket = io.connect(':1337');

var user = null;

var ball = new Ball();

socket.on("userCreated", function(id){
	if(user === null){
		user = new User(id);
	}
	console.log("I'm user " + user.id);
});

socket.on("launchBall", function(direction){
	ball.launch(socket, user, direction);
});

// ----------------- TEST ----------------- //
function makeSquare(value){
	socket.emit("makeSquare", value);
}

socket.on("squareResult", function(result){
	
	console.log("result : " + result);
	
});
// ----------------- END ----------------- //

function autoLaunchBall(){
	ball.launch(socket, user, "toRight");
}