//Detect a line to circle collision. Yes I did just quote the function name...
//Function creds: http://processing.org/discourse/beta/num_1259957186.html
function lineCircleCollision(x0, y0, x1, y1, cx, cy, r){
	var fxgy,t;
	var f = (x1 - x0);
	var g = (y1 - y0);
	var f2 = f*f;
	var g2 = g*g;
	var fg2 = f2 + g2;
	var r2 = r*r;

	var xc0 = cx - x0;
	var yc0 = cy - y0;
	var xj1 = cx - x1;
	var yj1 = cy - y1;
	var fygx = f*yc0 - g*xc0;
	var root = r*r*fg2 - fygx*fygx;

	if(root >= 0){
		fxgy = f*xc0 + g*yc0;
		t = fxgy / fg2;
		return (
			(t >= 0 && t <= 1) ||
			(xc0*xc0 + yc0*yc0 < r2) ||
			(xj1*xj1 + yj1*yj1 < r2)
		);
	}
	return false;
};

/** Rotates the heading of a 2D vector by a specified angle.
 *
 * Took a long time to get this code working dynamically.
 * Main issue was in reseting the magnitude.
 */
function rotateVector(vec, angle) {
	var newVec = vec.get();
	var magnitude = newVec.mag();
	var adjustedAngle = newVec.heading2D()+angle;
	
	// Resetting the magnitude is key.
	newVec.x = magnitude * Math.cos(adjustedAngle);
	newVec.y = magnitude * Math.sin(adjustedAngle);
	
	return newVec;
};
