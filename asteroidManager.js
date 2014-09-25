/** Asteroid Manager Class
 *
 * This contains the basic functions need to manage asteroids.
 */
 function AsteroidsManager(){
	processing = Processing.getInstanceById('targetcanvas');
	this.asteroids = Array();
	
	
	this.addAsteroid = function(pos, vel, level){
		this.asteroids.push((new Asteroid(pos, vel, level)));
	};

	this.addRandomAsteroid = function(params){
		// If param is undefined. Set to dictionary.
		params = params === undefined ? {} : params;
		
		pos = params['pos'];
		vel = params['vel'];
		level = params['level'];
		
		if(pos === undefined){
			x = Math.random()*Processing.width;
			y = Math.random()*Processing.height;
			pos = [x, y];
		}
		
		if(level === undefined){
			level = Math.random()*5;
		}
		
		if(vel === undefined){
			// Generate a random heading.
			heading = Math.random()*360;
			angle = heading - processing.PI/2;
			vel = new processing.PVector(Math.cos(angle), Math.sin(angle));
		}
		
		// Add the new asteroid.
		this.addAsteroid(
			[pos[0], pos[1]],
			[vel.x, vel.y],
			level
		);
	}

	this.removeAsteroid = function(index){
		this.asteroids.splice(index, 1);
	};

	// Move all asteroids.
	this.moveAsteroids = function(tickTime, gameSpeed){
		for(var i=0; i<this.asteroids.length; i+=1){
			this.asteroids[i].move(tickTime, gameSpeed);
			this.asteroids[i].bound(500);
		}
	};

	// Display all of the asteroids.
	this.displayAsteroids = function(){
		for(var i=0; i<this.asteroids.length; i+=1){
			this.asteroids[i].display();
		}
	};

	// Break specified asteroid into specified amound of smaller pieces.
	this.breakAsteroid = function(index, pieces){
		// Do not create more asteroids if it is a lvevel one. Simple delete
		if(this.asteroids[index].level===1){
			this.removeAsteroid(index);
		}
		else{
			for(var i=0; i<pieces; i+=1){
				// Add the new asteroid. with random heading.
				params = {
					'pos' :
						[
							this.asteroids[index].position.x,
							this.asteroids[index].position.y
						],
					'level' : this.asteroids[index].level-1
				};
				this.addRandomAsteroid(params);
			}
			this.removeAsteroid(index);
		}
	};
	
	// This will only detect collisions with round objects.
	// Returns asteroid collided with.
	this.detectCircularCollision = function(pos, size){
		for(var i=0; i<this.asteroids.length; i+=1){
			distance = this.asteroids[i].position.dist(pos);
			if(distance<this.asteroids[i].size/2+size/2){
				// only return one asteroid.
				return i;
			}
		}
		return -1;
	};
	
}
