/** Frame Timer
 *
 * Regulates game by seperating the games speed from the framerate.
 * So a change in framerate will not affect the game speed
 * as the timing and movement adjusts accordingly.
 */
function FrameTimer(){
	// Initiatiaize the timer.
	this.lastTick = (new Date()).getTime();
	
	this.getTickTime = function(){
		// Returns the time in milliseconds since the last tick.
		return (new Date()).getTime() - this.lastTick;
	};
	
	// Resets the timer.
	this.tick = function(){
		this.lastTick = (new Date()).getTime()
	};
}
