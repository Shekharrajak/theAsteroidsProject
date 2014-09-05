/** Asteroid class.
 *
 *
 */
function Asteroid(pos, vel, level){
	// TODO: Don't hardcode this!
	processing = Processing.getInstanceById('targetcanvas');

	// Seting level default value ot 3
	level = typeof level !== 'undefined' ? level : 3;
	// Level defines how many times the asteroids breaks when shot.
	// Asteroid go down a level when shot. And die at level 0.
	this.level = level;
	this.incrementSize = 20;
	this.size = this.incrementSize*this.level;
	this.tailLength = 5;
	
	// Just in case this type of functionality of projectiles not moving is useful.
	this.moving = true

	this.position = new processing.PVector(pos[0], pos[1]);
	this.velocity = new processing.PVector(vel[0], vel[1]);
	
	// Set the position of the asteroid.
	this.setPos = function(newXPos, newYPos){
		this.position.x = newXPos;
		this.position.y = newYPos;
	};
	
	// Keep the projectile within the screen size given.
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

	// Move asteroid accordingly.
	this.move = function(tickTime, gameSpeed) {
		if(this.moving === true){
			var tempSpeed = new processing.PVector(0,0);
			tempSpeed.set(this.velocity);
			tempSpeed.mult(tickTime/gameSpeed);
			this.position.add(tempSpeed);
		}
	};
	
	// Display the asteroid.
	this.display = function() {
		processing.stroke(25,200,25);
		processing.strokeWeight(1);
		processing.fill(255,100,100);
		processing.ellipse(
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);
	};
}
