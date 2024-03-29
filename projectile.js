//TODO: Get tail length to convert to units first
//so that the length is measure in pixels not speed
function Projectile(pos, vel, heading) {
	processing = Processing.getInstanceById('targetcanvas');

	this.size = 16;
	this.speed = 2;

	this.lifetime = 7000; // in milliseconds
	this.creationTime = (new Date()).getTime();

	//Just in case this type of functionality is usefull.
	this.moving = true;


	this.position = new processing.PVector(pos.x, pos.y);


	angle = heading - processing.PI/2;
	force = new processing.PVector(Math.cos(angle), Math.sin(angle));
	force.mult(this.speed);

	var tempVel = new processing.PVector(vel.x, vel.y);
	//bullet velocity shots from spaceship heading
	tempVel.add(force);
	//spaceships velocity
	tempVel.add(vel);
	this.velocity = new processing.PVector(tempVel.x, tempVel.y);


	this.setPos = function(newXPos, newYPos){
		this.position.x = newXPos;
		this.position.y = newYPos;
	};

	//keep the projectile within the screen size given
	this.bound = function(screenSize){
		if(this.position.x+this.size/2 <0){
			this.setPos(screenSize,this.position.y);
		}
		if(this.position.y+this.size/2 <0){
			this.setPos(this.position.x, screenSize);
		}
		if(this.position.x-this.size/2 >screenSize){
			this.setPos(0,this.position.y);
		}
		if(this.position.y-this.size/2 >screenSize){
			this.setPos(this.position.x, 0);
		}
	};
	this.move = function() {
		if(this.moving === true){
			var tempSpeed = new processing.PVector(0,0);
			tempSpeed.set(this.velocity);
			tempSpeed.mult(window.timer.getTickTime()/window.gameSpeed);
			this.position.add(tempSpeed);
		}
	};

	this.display = function() {
		processing.stroke(255,255,255);
		processing.strokeWeight(1);
		processing.fill(0,0,255);
		processing.ellipse(this.position.x, this.position.y, 3, 3);
	};
}
