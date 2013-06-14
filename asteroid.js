function Asteroid(pos, vel, level) {
    //seting level default value ot 3
    level = typeof level !== 'undefined' ? level : 3;
    // level defines how the asteroids breaks when shot
    this.level = level;
    this.minSize = 10;
    this.size = this.minSize*this.level;
    this.tailLength = 5;
    
    this.lifetime = 100;
    this.currentLifetime = 0;
    
    //just in case this type of functionality of projectiles not moving is usefull
    this.moving = true;
    
    processing = Processing.getInstanceById('targetcanvas');
    this.position = new processing.PVector(pos[0], pos[1]);
    this.velocity = new processing.PVector(vel[0], vel[1]);
    
    
    this.setPos = function(newXPos, newYPos){
        this.position.x = newXPos;
        this.position.y = newYPos;
    };
    
    //keep the projectile within the screen size given
    this.bound = function(screenSize){
        if(this.position.x+this.size/2 <0){
            this.setPos(screenSize,this.position.y);
        }
        if(this.position.y+this.size/2 <0){
            this.setPos(this.position.x, screenSize);
        }
        if(this.position.x-this.size/2 >screenSize){
            this.setPos(0,this.position.y);
        }
        if(this.position.y-this.size/2 >screenSize){
            this.setPos(this.position.x, 0);
        }
    };
    this.move = function() {
        if(this.moving === true){
            var tempSpeed = new processing.PVector(0,0);
            tempSpeed.set(this.velocity);
            tempSpeed.mult(window.timer.getTickTime()/window.gameSpeed);
            this.position.add(tempSpeed);
        }
    };
    
    this.display = function() {
        processing.stroke(25,200,25);
        processing.strokeWeight(1);
        processing.fill(255,100,100);
        processing.ellipse(this.position.x, this.position.y, this.size*this.level, this.size*this.level);
        processing.rect(10,10,10,10);
    };
}