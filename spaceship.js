function Spaceship(processing) {
	processing = Processing.getInstanceById('targetcanvas');

	this.topspeed = 3;
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

	//List of vertices to draw the spaceship with.
	//Thisi means that the spaceship can now have a 
	//dynamic shape.
	this.vertices = [];
	
	this.setPos = function(newXPos, newYPos){
		this.position.x = newXPos;
		this.position.y = newYPos;
	};
	
	//keep the spaceship within the screen size given
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
	this.move = function(tickTime, gameSpeed) {
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
	
	this.applyForce = function(force) {
		f = force.get();
		this.acceleration.add(f);
	};

	this.stopForce = function() {
		this.velocity.mult(0);
	};
	
	this.turn = function (a, tickTime, gameSpeed) {
		this.heading += a*tickTime/gameSpeed;
	};
	
	this.thrust = function() {
		angle = this.heading - processing.PI/2;
		force = new processing.PVector(Math.cos(angle), Math.sin(angle));
		force.mult(this.accelRate);
		this.applyForce(force);
		this.thrusting = true;
	};
	
	this.back = function() {
		angle = this.heading - processing.PI/2;
		force = new processing.PVector(Math.cos(angle), Math.sin(angle));
		force.mult(-0.1);
		this.applyForce(force);
		this.backwards = true;
	};
		
	this.display = function() {
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.fill(175);
		if (this.thrusting) processing.fill(0, 255, 0);
		if (this.backwards) processing.fill(255, 0, 0);
		//TODO: Use vectors and vector roation to draw traingle.
			//triangle(posx+vec.x, posy+vec.y,posx-vec2.x,
			//posy-vec2.y, posx+vec2.x, posy+vec2.y);
		//TODO: Better center estimate.
		//Height to side ratio 0.866025
		
		var top = new processing.PVector();
		var bl = new processing.PVector();
		var br = new processing.PVector();
		var topD = new processing.PVector(0, -this.size*0.433);
		var blD = new processing.PVector(
			-this.size/2, this.size*0.433
		);
		var brD = new processing.PVector(
			this.size/2, this.size*0.433
		);
		top = this.position.get();
		bl = this.position.get();
		br = this.position.get();
		top.add(0, 0);
		//bl.add(-this.size/2, this.size*0.433);

		topD = rotateVector(topD, this.heading);
		blD = rotateVector(blD, this.heading);
		brD = rotateVector(brD, this.heading);
		top.add(topD);
		bl.add(blD);
		br.add(brD);
		//bl.add(dir)
		processing.triangle(top.x, top.y, bl.x, bl.y, br.x, br.y);
	};
	
	//TODO: Displaying shots shouldn't automatically move them.
	//Dang buh, I wrote some lazy code up North Rock...
	this.displayShots = function(tickTime, gameSpeed){
		for(var i=0;i<this.shots.length;i+=1){
			this.shots[i].move(tickTime, gameSpeed);
			this.shots[i].bound(500);
			this.shots[i].display();
		}
		this.deleteTimeouts();
	};
	//the default add shot will use the current ship pos and vel
	this.addShot = function(){
		this.shots.push(
			new Projectile(this.position, this.velocity, this.heading)
		);
	};
	this.removeShot = function(index){
		this.shots.splice(index, 1);
	};
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
