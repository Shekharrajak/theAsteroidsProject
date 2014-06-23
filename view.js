function View(processing){
	this.processing = processing;
	this.setterupper = function(){
		this.processing.size(500, 500);
		this.processing.frameRate(10);
		this.timer = new FrameTimer();
		this.ship = new Spaceship();
		this.shots = [];
		this.asteroidsManager = new AsteroidsManager();
		this.asteroidsManager.addAsteroid([100,100], [1,2], 3);
		
		this.gameSpeed = 15;
		
		this.timer.tick();
	};

	this.newGame = function(){

	};

	this.mainLoop = function(){
		//background
		this.processing.fill(0,0,0);
		this.processing.background(0,0,0);
		var tickTime = this.timer.getTickTime();

		this.asteroidsManager.moveAsteroids(
			tickTime,
			this.gameSpeed
		);

		this.asteroidsManager.displayAsteroids();
		
		this.processing.fill(255,0,0);
		this.ship.move(tickTime, this.gameSpeed);
		this.ship.bound(500);
		this.ship.display();
		
		this.ship.displayShots(tickTime, this.gameSpeed);
		
		//Maybe move colliosionn detectoin loop into some sort of class?
		//Check bullet to asteroid collisions.
		for(var i=0; i<this.ship.shots.length; i+=1){
			//TODO: Reevaluate how this collision  is done. Looks kinda lazy.
			asteroidHit = this.asteroidsManager.detectCircularCollision(
				this.ship.shots[i].position,
				this.ship.shots[i].size
			);
			if(asteroidHit!==-1){
				this.asteroidsManager.breakAsteroid(asteroidHit, 3);
				this.ship.removeShot(i);
			}
		}
		//Check asteroid to spaceship collisions.
		
		
		//update time since last frame.
		this.timer.tick();
	};

	this.keyPressed = function(){
		if (this.processing.keyCode === this.processing.UP) {
			this.ship.thrusting = true;
		}
		else if (this.processing.keyCode === this.processing.RIGHT) {
			this.ship.turningRight = true;
		}
		else if (this.processing.keyCode === this.processing.DOWN) {
			//movePlayer(3);
		}
		else if (this.processing.keyCode === this.processing.LEFT) {
			this.ship.turningLeft = true;
		}
		
		//fire key 'f'
		else if(this.processing.keyCode === 70){
			this.ship.addShot();
		}
	};

	this.keyReleased = function(){
		if (this.processing.keyCode === this.processing.UP) {
			this.ship.thrusting = false;
		}
		else if (this.processing.keyCode === this.processing.RIGHT) {
			this.ship.turningRight = false;
		}
		else if (this.processing.keyCode === this.processing.DOWN) {
			//movePlayer(3);
		}
		else if (this.processing.keyCode === this.processing.LEFT) {
			this.ship.turningLeft = false;
		}
	};

	//Manage collision between ship and asteroids.
	this.asteroidsShipCollision = function(){
		function asteroidShipCollisions(){
			for(var i=0; i<this.asteroidManager.asteroids.length; i+=1){
				//TODO: The spaceship should store info on it's vertexes.
				//lineCircleCollision(this.ship.vertex[0].x, ...
			}
		}
	};
}
