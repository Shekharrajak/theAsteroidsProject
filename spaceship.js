function Spaceship(processing) { 
    this.topspeed = 3;
    this.heading = 0;
    this.size = 16;
    this.dampening = 0.995;
    this.accelRate = 0.04;

    this.thrusting = false;
    this.backwards = false;
    
    this.turningRight = false;
    this.turningLeft = false;
    
    this.position = new processing.PVector(250, 250);
    this.velocity = new processing.PVector();
    this.acceleration = new processing.PVector();
    
    this.shots = [];
    
    
    this.setPos = function(newXPos, newYPos){
        this.position.x = newXPos;
        this.position.y = newYPos;
    };
    
    //keep the spaceship within the screen size given
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
        if(this.thrusting === true){
            this.thrust();
        }
        if(this.turningRight === true){
            this.turn(0.05);
        }
        if(this.turningLeft === true){
            this.turn(-0.05);
        }
          
        var tempAccel = new processing.PVector(0,0);
        tempAccel.set(this.acceleration);
        tempAccel.mult(window.timer.getTickTime()/window.gameSpeed);
        this.velocity.add(tempAccel);
        //this.velocity.mult(this.dampening);
        this.velocity.limit(this.topspeed);
        
        var tempSpeed = new processing.PVector(0,0);
        tempSpeed.set(this.velocity);
        tempSpeed.mult(window.timer.getTickTime()/window.gameSpeed);
        this.position.add(tempSpeed);
        
        this.acceleration.mult(0);
      };
    
      this.applyForce = function(force) {
        f = force.get();
        this.acceleration.add(f);
      };
    
      this.stopForce = function() {
        this.velocity.mult(0);
      };
    
      this.turn = function (a) {
        this.heading += a*window.timer.getTickTime()/window.gameSpeed;
      };
    
      this.thrust = function() {
        angle = this.heading - processing.PI/2;
        force = new processing.PVector(Math.cos(angle), Math.sin(angle));
        force.mult(this.accelRate);
        this.applyForce(force); 
        this.thrusting = true;
      };
    
      this.back = function() {
        angle = this.heading - processing.PI/2;
        force = new processing.PVector(Math.cos(angle), Math.sin(angle));
        force.mult(-0.1);
        this.applyForce(force); 
        this.backwards = true;
      };
    
      this.display = function() { 
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.pushMatrix();
        processing.translate(this.position.x, this.position.y+this.size);
        processing.rotate(this.heading);
        processing.fill(175);
        if (this.thrusting) processing.fill(0, 255, 0);
        if (this.backwards) processing.fill(255, 0, 0);
    
        processing.beginShape();
        processing.vertex(-this.size, this.size);
        processing.vertex(0, -this.size);
        processing.vertex(this.size, this.size);
        processing.endShape(processing.CLOSE);
        processing.rectMode(processing.CENTER);
        processing.popMatrix();
      };
      
      
      this.displayShots = function(){
          for(var i=0;i<this.shots.length;i+=1){
            this.shots[i].move();
            this.shots[i].bound(500);
            this.shots[i].display();
        }
        this.deleteTimeouts();
      };
      //the default add shot will use the current ship pos and vel
      this.addShot = function(){
          this.shots.push(new Projectile(this.position, this.velocity, this.heading));
      };
      this.removeShot = function(index){
        this.shots.splice(index, 1);
    };
      this.deleteTimeouts = function(){
        for(var i=0;i<this.shots.length;i+=1){
            if(this.shots[i].creationTime+this.shots[i].lifetime<(new Date()).getTime()){
                this.shots.splice(i,1);
            }
        }   
      };
}