function sketchProc(processing) {
	// Override draw function, by default it's called 60 times per/s.
	processing.background(255,255,255);
	
	view = new View(processing);
	view.setterupper();

	processing.draw = function(tickTime) {
		view.mainLoop();
	};
	processing.keyPressed = function() {
		view.keyPressed();
	};
	processing.keyReleased = function() {
		view.keyReleased();
	};
}
