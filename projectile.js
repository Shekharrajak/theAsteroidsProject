/** Projectile (a.k.a. shot)
 *
 * This should try to stay as a pretty generic object.
 */
function Projectile(pos, vel, heading) {
	processing = Processing.getInstanceById('targetcanvas');

	this.size = 3;
	this.speed = 2;

	// How long the projectile should live. In milliseconds.
	this.lifetime = 7000;
	this.creationTime = (new Date()).getTime();

	// Just in case this type of functionality of projectiles not moving is useful.
	this.moving = true

	this.position = new processing.PVector(pos.x, pos.y);

	angle = heading - processing.PI/2;
	force = new processing.PVector(Math.cos(angle), Math.sin(angle));
	force.mult(this.speed);

	var tempVel = new processing.PVector(vel.x, vel.y);
	// Bullet velocity shots from spaceship heading.
	tempVel.add(force);
	// Spaceships velocity
	tempVel.add(vel);
	this.velocity = new processing.PVector(tempVel.x, tempVel.y);


	this.setPos = function(newXPos, newYPos){
		this.position.x = newXPos;
		this.position.y = newYPos;
	};

	// TODO: Centralize all of this generic bound functions.
	// Keep the projectile within the screen size given
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

	this.move = function(tickTime, gameSpeed){
		if(this.moving === true){
			var tempSpeed = new processing.PVector(0,0);
			tempSpeed.set(this.velocity);
			tempSpeed.mult(tickTime/gameSpeed);
			this.position.add(tempSpeed);
		}
	};

	this.display = function(){
		processing.stroke(255,255,255);
		processing.strokeWeight(1);
		processing.fill(0,0,255);
		processing.ellipse(this.position.x, this.position.y, this.size, this.size);
	};
}
