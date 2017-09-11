function Ball(){
	
	this.$ball = $("#ball");
	this.height = this.$ball.width();
	this.width = this.$ball.height();
	this.interval = null;
}

Ball.prototype.launch = function(socket, user, direction){
	var context = this;
	var emited = false;
	clearInterval(context.interval);
	context.interval = setInterval(function(){
		if(direction == "toRight" && !emited){
			context.$ball.animate({'left' : '+=50'}, 100);
			if(context.$ball.offset().left > ($(window).width() - context.width) && !emited){
				console.log(context.$ball.offset().left, context.width, $(window).width());
				clearInterval(context.interval);
				socket.emit("ballOnLimitForUser", user.id);
				emited = true;
			}
		}
		else if (direction == "toLeft" && !emited){
			context.$ball.animate({'left' : '-=50'}, 100);
			if(context.$ball.offset().left < 0 && !emited){
				clearInterval(context.interval);
				socket.emit("ballOnLimitForUser", user.id);
				emited = true;
			}
		}
	}, 100);
}