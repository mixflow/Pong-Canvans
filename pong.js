(function(){
// the fixed parameters which wouldn't be changed after.
var WIDTH = 600
var HEIGHT = 400       
var BALL_RADIUS = 20
var PAD_WIDTH = 8
var PAD_HEIGHT = 80
var HALF_PAD_WIDTH = PAD_WIDTH / 2
var HALF_PAD_HEIGHT = PAD_HEIGHT / 2
var LEFT = false
var RIGHT = true

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);

//helper function
function rect2(centroid, w, h, bgColor, borderColor){
	ctx.fillStyle = bgColor;
	ctx.strokeStyle = borderColor;

	x = centroid[0] - w / 2;
	y = centroid[1] - h / 2;
	rect(x, y, w, h);
}

function rect(x, y, w, h, bgColor, borderColor){
	ctx.fillStyle = bgColor;
	ctx.strokeStyle = borderColor;

	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

// keyboard handler


// draw handler
function drawBackground(bgColor, borderColor){
	rect(0, 0, WIDTH, HEIGHT, bgColor, borderColor); // cover the background
}

drawBackground("white", "black"); 
rect2([WIDTH / 2, HEIGHT / 2], 20, 50);

// controlling the frame rate of 'requestanimationframe'
var FPS = 60;
var INTERVAL = 1000/FPS;
var nowTime;
var beforeTime = Date.now();
var delta;

function step(timestamp){
	requestAnimationFrame(step);

	nowTime = Date.now();

	delta = nowTime - beforeTime;

	if(delta > INTERVAL){
		//update time
		beforeTime = nowTime - (delta % INTERVAL);

		//drawing
	}
}

step(0);

})();