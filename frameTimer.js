function FrameTimer(){
	this.lastTick = (new Date()).getTime();
	
	this.getTickTime = function(){
		return (new Date()).getTime() - this.lastTick;
	};
	
	this.tick = function(){
		var currentTick = (new Date()).getTime();
		this.lastTick = currentTick;
	};
}
