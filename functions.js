var points = [];
var hits = 1;
var misses = 1;
var estimate = 0;

var renderSize = 500;

function getDistance(pointA, pointB){
	var xDif = pointA[0]-pointB[0];
	var yDif = pointA[1]-pointB[1];
	var c = xDif*xDif + yDif*yDif;
	return Math.sqrt(c);
}

// Function adds a random point and adjusts hits/misses and estimate accordingly
function addRandPoint(){
	processing = Processing.getInstanceById('targetcanvas');
	var randPoint = [Math.random()*renderSize ,Math.random()*renderSize];
	points.push(randPoint);
	
	// iif the radnom point is in the radius of the circle.
	if (getDistance([renderSize/2,renderSize/2], randPoint)<= renderSize/2){
		hits +=1;
	}
	else{
		misses +=1;
	}
	estimate = 4*hits/(hits+misses);
}

// very time comsuming since the point are ever increasing, use the function below
function drawPoints(processing, pointSize, color){
	for(var i=0; i<points.length; i+=1){
		processing.noStroke();
		processing.fill(color[0],color[1],color[2]);
		processing.ellipse(points[i][0],points[i][1],pointSize,pointSize);
	}
}
// to save time this fucntion only draw the lats point in the array
function drawLastPoint(processing, pointSize, color){
	processing.noStroke();
	processing.fill(color[0],color[1],color[2],color[3]);
	processing.ellipse(points[points.length-1][0],points[points.length-1][1],pointSize,pointSize);
}
