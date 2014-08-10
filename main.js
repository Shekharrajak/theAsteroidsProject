function sketchProc(processing) {
	processing.background(255,255,255);
	
	// Create a new view that encapsulates the entire game.
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
