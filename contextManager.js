/** Controls the high level game 'screen flow'.
 *
 * Takes charge of changing the processing.draw loop
 * and processing keybindings.
 */
function contextManager(view){
	// TODO: Don't hardcode this!
	this.processing = Processing.getInstanceById('targetcanvas');

	// Pass the current view so that we can bind it to it's own functions.
	this.view = view;
	
	/** Change the processing loop and key bindings. */
	this.setContext = function(newLoopFunction, newKeyPresses, newKeyReleases){
		if(newLoopFunction != null){
			this.setMainLoop(newLoopFunction);
		}
		if(newKeyPresses != null){
			this.setKeyPresses(newKeyPresses);
		}
		if(newKeyReleases != null){
			this.setKeyReleases(newKeyReleases);
		}
	};
	this.setMainLoop = function(newLoopFunction){
		// Overload the processing draw function with a new main loop.
		this.processing.draw = newLoopFunction.bind(this.view);
	};

	this.setKeyPresses = function(newKeyPresses){
		// Overload the processing keyPresses function with the new context.
		this.processing.keyPressed = newKeyPresses.bind(this.view);
	};

	this.setKeyReleases = function(newKeyReleases){
		// Overload the processing keyReleases function with the new context.
		this.processing.keyReleased = newKeyReleases.bind(this.view);
	};
}
