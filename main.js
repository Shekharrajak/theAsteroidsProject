function setterupper(processing){
	processing.setup = function() {
	processing.size(500, 500);
	processing.frameRate(10);
	window.timer = new FrameTimer();
	window.ship = new Spaceship(processing);
	window.shots = [];
	window.asteroidsManager = new AsteroidsManager();
	window.asteroidsManager.addAsteroid([100,100], [1,2], 3);
	
	window.gameSpeed = 15;
	
	window.timer.tick();
	
	};
}
function sketchProc(processing) {
	// Override draw function, by default it's called 60 times per/s.
	processing.background(255,255,255);
	
	processing.draw = function(tickTime) {
		//background
		processing.fill(0,0,0);
		processing.background(0,0,0);
		
		window.asteroidsManager.moveAsteroids();
		window.asteroidsManager.displayAsteroids();
		
		processing.fill(255,0,0);
		window.ship.move();
		window.ship.bound(500);
		window.ship.display();
		
		window.ship.displayShots();
		
		//Maybe move colliosionn detectoin loop into some sort of class?
		for(var i=0; i<window.ship.shots.length; i+=1){
			asteroidHit = window.asteroidsManager.detectCircularCollision(
				window.ship.shots[i].position, window.ship.shots[i].size
			);
			if(asteroidHit!==-1){
				window.asteroidsManager.breakAsteroid(asteroidHit, 3);
				window.ship.removeShot(i);
			}
			
		}
		
		
		//update time since last frame.
		window.timer.tick();
		
	};
	setterupper(processing);
	processing.keyPressed = function() {
		if (processing.keyCode === processing.UP) {
			window.ship.thrusting = true;
		}
		else if (processing.keyCode === processing.RIGHT) {
			window.ship.turningRight = true;
		}
		else if (processing.keyCode === processing.DOWN) {
			//movePlayer(3);
		}
		else if (processing.keyCode === processing.LEFT) {
			window.ship.turningLeft = true;
		}
		
		//fire key 'f'
		else if(processing.keyCode === 70){
			window.ship.addShot();
		}
	};
	processing.keyReleased = function() {
		if (processing.keyCode === processing.UP) {
			window.ship.thrusting = false;
		}
		else if (processing.keyCode === processing.RIGHT) {
			window.ship.turningRight = false;
		}
		else if (processing.keyCode === processing.DOWN) {
			//movePlayer(3);
		}
		else if (processing.keyCode === processing.LEFT) {
			window.ship.turningLeft = false;
		}
	};
}
