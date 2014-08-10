/** An encapsulation of the whole game.
 *
 * This class encapsulates all variables and sub-classes.
 * Also, control high level gameplay. Starting, stoping, reseting, etc.
 *
 * Potentially could have two instances at the same time...
 */
function View(processing){
	this.processing = processing;
	this.setterupper = function(){
		this.processing.size(500, 500);
		this.processing.frameRate(10);
		this.timer = new FrameTimer();
		this.ship = new Spaceship();
		this.shots = [];
		this.asteroidsManager = new AsteroidsManager();
		// Add a new testing asteroid.
		this.asteroidsManager.addAsteroid([100,100], [1,2], 3);
		
		this.gameSpeed = 15;
		
		this.timer.tick();
	};

	this.newGame = function(){

	};

	/** Main game loop.
	 *
	 * Runs once everything is initiated and started and not paused, etc.
	 */
	this.mainLoop = function(){
		// tickTime de-couples the framerate from the gamespeed.
		var tickTime = this.timer.getTickTime();

		// Display background to clear everything.
		this.processing.fill(0,0,0);
		this.processing.background(0,0,0);

		// Move than display all asteroids
		this.asteroidsManager.moveAsteroids(
			tickTime,
			this.gameSpeed
		);
		this.asteroidsManager.displayAsteroids();
		
		// Display the ship.
		this.processing.fill(255,0,0);
		this.ship.move(tickTime, this.gameSpeed);
		this.ship.bound(500);
		this.ship.display();
		
		// Display the ship's shots.
		this.ship.displayShots(tickTime, this.gameSpeed);
		
		// TODO: Maybe move colliosionn detectoin loop into some sort of class?
		// Check shot to asteroid collisions.
		for(var i=0; i<this.ship.shots.length; i+=1){
			//TODO: Reevaluate how this collision is done. Looks kinda lazy.
			asteroidHit = this.asteroidsManager.detectCircularCollision(
				this.ship.shots[i].position,
				this.ship.shots[i].size
			);
			// If collision, break the asteroid and remove shot.
			if(asteroidHit!==-1){
				this.asteroidsManager.breakAsteroid(asteroidHit, 3);
				this.ship.removeShot(i);
			}
		}

		// Check asteroid to spaceship collisions.
		
		
		// Update time since last frame.
		// TODO: Try to remember/figure out why this is done last.
		// Or does is even matter when is runs as long it's consistent?
		// I kinda feel like its missing the whole loop's time.
		// Like I should place it right at the top under the 
		// getTickTime() call
		this.timer.tick();
	};

	// TODO: Hmmm, maybe I could streamline this code into function.
	// So that I could quickly change keymapping between context screens.
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
