function test(processing){
	processing.fill(233,0,0);
}

Spaceship = function() {
	processing = Processing.getInstanceById('targetcanvas');
	this.topspeed = 20;
	this.heading = 0;
	this.size = 16;

	this.thrusting = true;
	this.backwards = false;
	
	this.location = processing.PVector(500, 500);
	this.velocity = processing.PVector();
	this.acceleration = processing.PVector();

	this.update = function() {
		this.velocity.add(acceleration);
		this.velocity.limit(topspeed);
		this.location.add(velocity);
		this.acceleration.mult(0);
	};
	
	this.applyForce = function(force) {
		f = force.get();
		this.acceleration.add(f);
	};
	
	this.stopForce = function() {
		this.velocity.mult(0);
	};
	
	this.turn = function (a) {
		this.heading += a;
	};
	
	this.thrust = function() {
		angle = this.heading - PI/2;
		force = processing.PVector(cos(angle), sin(angle));
		force.mult(0.1);
		this.applyForce(force);
		this.thrusting = true;
	};
	
	this.back = function() {
		angle = this.heading - PI/2;
		force = processing.PVector(cos(angle), sin(angle));
		force.mult(-0.1);
		this.applyForce(force);
		this.backwards = true;
	};
	
	this.display = function() {
		processing.stroke(0);
		processing.strokeWeight(2);
		processing.pushMatrix();
		processing.translate(this.location.x, this.location.y+size);
		processing.rotate(this.heading);
		processing.fill(175);
		if (this.thrusting) processing.fill(0, 255, 0);
		if (this.backwards) processing.fill(255, 0, 0);
	
		processing.beginShape();
		processing.vertex(-size, size);
		processing.vertex(0, -size);
		processing.vertex(size, size);
		processing.endShape(CLOSE);
		processing.rectMode(CENTER);
		processing.popMatrix();
		
		//once drawn reset these for next update.
		this.thrusting = false;
		this.backwards = false;
	};
};
