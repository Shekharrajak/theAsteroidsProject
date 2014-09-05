/** Spaceship class.
 *
 * Also, encapsulates a spaceship's shots in this class.
 */
function Spaceship(processing){
	// TODO: Maybe not hardcode all of these inititial settings.
	processing = Processing.getInstanceById('targetcanvas');


	this.heading = 0;
	this.size = 50;
	this.dampening = 0.995;
	this.accelRate = 0.04;

	this.thrusting = false;
	this.backwards = false;
	
	this.turningRight = false;
	this.turningLeft = false;
	
	this.position = new processing.PVector(250, 250);
	this.velocity = new processing.PVector();
	this.acceleration = new processing.PVector();
	
	this.shots = [];

	// List of vertices to draw the spaceship with.
	// This means that the spaceship can now have a dynamic shape.
	// Height to side ratio 0.866025
	this.vertices = [
		new processing.PVector(0, -this.size*0.433),
		new processing.PVector(-this.size/3, this.size*0.433),
		new processing.PVector(this.size/3, this.size*0.433)
	];
	
	this.setPos = function(newXPos, newYPos){
		this.position.x = newXPos;
		this.position.y = newYPos;
	};
	
	// Keep the spaceship within the screen size given.
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

	// Move ship according to tickTime.
	this.move = function(tickTime, gameSpeed){
		if(this.thrusting === true){
			this.thrust(tickTime, gameSpeed);
		}
		if(this.turningRight === true){
			this.turn(0.05, tickTime, gameSpeed);
		}
		if(this.turningLeft === true){
			this.turn(-0.05, tickTime, gameSpeed);
		}
		
		var tempAccel = new processing.PVector(0,0);
		tempAccel.set(this.acceleration);
		tempAccel.mult(tickTime/gameSpeed);
		this.velocity.add(tempAccel);
		//this.velocity.mult(this.dampening);
		this.velocity.limit(this.topspeed);
		
		var tempSpeed = new processing.PVector(0,0);
		tempSpeed.set(this.velocity);
		tempSpeed.mult(tickTime/gameSpeed);
		this.position.add(tempSpeed);
		
		this.acceleration.mult(0);
	};
	
	/** A pretty generic function that can move the ship in any direction.
	 *
	 * Will come in hand if we ever get to the point of which the ship's
	 * momentum by anything other than it's thrust.
	 */
	this.applyForce = function(force){
		f = force.get();
		this.acceleration.add(f);
	};

	/** Currently unused. But completely stops the ship.
	 *
	 * Will be usefull if we ever get a 'brake' feature.
	 */
	this.stopForce = function(){
		this.velocity.mult(0);
	};
	
	// TODO: Maybe turn angle into a ratio? Something like RPMs?
	// Turn ship a specified angle.
	this.turn = function (angle, tickTime, gameSpeed){
		this.heading += angle*tickTime/gameSpeed;
	};
	
	// Thrust ship forwards.
	this.thrust = function(){
		angle = this.heading - processing.PI/2;
		force = new processing.PVector(Math.cos(angle), Math.sin(angle));
		force.mult(this.accelRate);
		this.applyForce(force);
		this.thrusting = true;
	};
	
	// Unused, but thrust ship backwards.
	this.back = function(){
		angle = this.heading - processing.PI/2;
		force = new processing.PVector(Math.cos(angle), Math.sin(angle));
		force.mult(-0.1);
		this.applyForce(force);
		this.backwards = true;
	};
		
	/** Returns array of the current absolute postion of ship vertices.
	 *
	 * Opposed to this.vertices which simple show the relative
	 * position relative to the ship origin position.
	 * TODO: Get this to be a dynamic funtion instead of
	 * only using just three vertices.
	 */
	this.getCurrentVertices = function(){
		// TODO: Better documention of this process!
		var top = new processing.PVector();
		var bl = new processing.PVector();
		var br = new processing.PVector();

		// Create temporary vectors to rotate with.
		var topD = this.vertices[0];
		var blD = this.vertices[1];
		var brD = this.vertices[2];

		// All vertices start at the ships center position.
		top = this.position.get();
		bl = this.position.get();
		br = this.position.get();
		top.add(0, 0);
		//bl.add(-this.size/2, this.size*0.433);

		// Now rotate the temp vectors according to the ship's heading.
		// This is only rotating relative to point 0, 0.
		// If you try to rotate around any other point everything gets skewed.
		topD = rotateVector(topD, this.heading);
		blD = rotateVector(blD, this.heading);
		brD = rotateVector(brD, this.heading);
		// Move each vertex away from the center accordingly.
		top.add(topD);
		bl.add(blD);
		br.add(brD);
		return [top, bl, br]
	};
	/** Displays the ship.
	 *
	 * Displays based on the ship's vertexs and rotation.
	 * So could potentially have a dynamic ship shape.
	 */
	this.display = function(){
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.fill(175);
		if (this.thrusting) processing.fill(0, 255, 0);
		if (this.backwards) processing.fill(255, 0, 0);

		currentVertices = this.getCurrentVertices();
		processing.triangle(
			currentVertices[0].x,
			currentVertices[0].y,
			currentVertices[1].x,
			currentVertices[1].y,
			currentVertices[2].x,
			currentVertices[2].y
		);
	};
	
	// TODO: Displaying shots shouldn't automatically move them.
	// Dang buh, I wrote some lazy code up North Rock...
	this.displayShots = function(tickTime, gameSpeed){
		for(var i=0;i<this.shots.length;i+=1){
			this.shots[i].move(tickTime, gameSpeed);
			this.shots[i].bound(500);
			this.shots[i].display();
		}
		this.deleteTimeouts();
	};
	// The default add shot will use the current ship pos and vel.
	this.addShot = function(){
		this.shots.push(
			new Projectile(this.position, this.velocity, this.heading)
		);
	};
	
	this.removeShot = function(index){
		this.shots.splice(index, 1);
	};
	
	// Removes shots base on how long they have been alive.
	this.deleteTimeouts = function(){
		for(var i=0;i<this.shots.length;i+=1){
			if(this.shots[i].creationTime+this.shots[i].lifetime<(
				new Date()).getTime()
			){
				this.shots.splice(i,1);
			}
		}
	};
}
