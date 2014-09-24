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
		this.gameLevel = 1; // Shows what level the game is on.
		this.asteroidsManager = new AsteroidsManager();
		// Add a new testing asteroid.
		this.asteroidsManager.addAsteroid([100,100], [1,2], 1);
		this.contextManager = new contextManager(this);
		
		this.gameSpeed = 15;
		
		this.timer.tick();
	};


	this.newGame = function(){

	};

	/** Run when the ship dies.
	 *
	 * Got hit by asteroid, runs out of fuel, etc.
	 */
	this.shipDeath = function(){
		// Decrement live once we get them...

		// Reset the ship.
		this.ship.resetShip();
		this.ship.lives -= 1;
	};

	//Manage collision between ship and asteroids.
	this.asteroidsShipCollision = function(){
		for(var i=0; i<this.asteroidsManager.asteroids.length; i+=1){
		currentVertices = this.ship.getCurrentVertices();
			for(var j=0; j<currentVertices.length; j+=1){
				// Wrap around the vertices.
				if (j+1 >= currentVertices.length){
					next = 0;
				}
				else{
					next = j+1;
				}
				hit = lineCircleCollision(
					// Points of the ships sides.
					currentVertices[j].x,
					currentVertices[j].y,
					currentVertices[next].x,
					currentVertices[next].y,
					// Asteroid position and size*2(radius).
					this.asteroidsManager.asteroids[i].position.x,
					this.asteroidsManager.asteroids[i].position.y,
					this.asteroidsManager.asteroids[i].size/2// * 2
				)
				if(hit){
					this.shipDeath();
					if(this.ship.lives <= 0){
						this.ship.lives = 3;
						this.level = 1;
					}
					this.contextManager.setContext(
						this.preMainLoop,
						this.preMainKeyPresses,
						null
					);
				}
			}
		}
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

		// Display this text first
		processing.fill(200, 0, 0);
		processing.textSize(20);
		processing.text("Level " + this.gameLevel, 10, 20);
		processing.text("Lives " + this.ship.lives, 80, 20);

		// Move than display all asteroids
		this.asteroidsManager.moveAsteroids(tickTime, this.gameSpeed);
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
		this.asteroidsShipCollision();

		// If we destroy all asteroids.
		if(this.asteroidsManager.asteroids.length <= 0){
			var angle = Math.random(processing.TWO_PI);
			vel = new processing.PVector(
				Math.cos(angle),
				Math.sin(angle)
			);
			this.asteroidsManager.addAsteroid(
				[100, 100],
				[1,2],
				this.gameLevel + 1
			);
			this.gameLevel += 1;
		}
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
	this.mainKeyPresses = function(){
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

	this.mainKeyReleases = function(){
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





	/** Pre-main loop.
	 *
	 * This loop shows something like "Press 'i' to spawn".
	 */
	this.preMainLoop = function(){
		// tickTime de-couples the framerate from the gamespeed.
		var tickTime = this.timer.getTickTime();

		this.processing.fill(0,0,0);
		this.processing.background(0,0,0);

		// Display this text first
		processing.fill(200, 0, 0);
		processing.textSize(20);
		processing.text("Level " + this.gameLevel, 10, 20);
		processing.text("Lives " + this.ship.lives, 80, 20);
		// Move than display all asteroids
		this.asteroidsManager.moveAsteroids(tickTime, this.gameSpeed);
		this.asteroidsManager.displayAsteroids();

		this.processing.fill(200, 0, 0, 200);
		this.processing.textSize(40);
		processing.text("Press 'i' to spawn.", 19, 250);

		this.timer.tick();
	};

	this.preMainKeyPresses = function(){
		// 'i' key pressed.
		if(this.processing.keyCode === 73){
			this.contextManager.setContext(
				this.mainLoop,
				this.mainKeyPresses,
				this.mainKeyReleases
			);
		}
	}
}
