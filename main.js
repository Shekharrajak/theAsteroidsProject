function sketchProc(processing) {
	processing.background(255,255,255);
	
	// Create a new view that encapsulates the entire game.
	view = new View(processing);
	view.setterupper();

	processing.draw = function(){
		view.preMainLoop();
	};
	processing.keyPressed = function() {
		view.preMainKeyPresses();
	};
}
