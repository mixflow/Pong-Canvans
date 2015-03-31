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

// controlling the frame rate of 'requestanimationframe'
var FPS = 60;
var INTERVAL = 1000/FPS;
var nowTime;
var beforeTime = Date.now();
var delta;

//ball and paddle
var ball_pos, ball_vel;
var paddle1_pos, paddle1_vel;
var paddle2_pos, paddle2_vel;
var score1, score2;
var velocity = 10;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);

//uiltity function
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//helper function
function spawnBall(direction){
	direction = direction || RIGHT;

	ball_pos = [WIDTH / 2, HEIGHT / 2];
	ball_vel = [getRandomArbitrary(120, 240) / FPS, getRandomArbitrary(60, 80) / FPS];

	if(direction === LEFT){
		ball_vel[0] = -ball_vel[0];
	}
}

function newGame(){
	// init two paddle velocities
    paddle1_vel = [0, 0]
    paddle2_vel = [0, 0]
    // init two paddle position 
    paddle1_pos = [HALF_PAD_WIDTH, HEIGHT / 2]
    paddle2_pos = [WIDTH - 1 - HALF_PAD_WIDTH, HEIGHT / 2]
    
    // init the score
    score1 = score2 = 0
    
    spawnBall(RIGHT)
}

function isPaddleStayCanvans(pos, vel){
	return !(pos[1] <= HALF_PAD_HEIGHT & vel[1] < 0) & 
		!(pos[1] >= HEIGHT - HALF_PAD_HEIGHT - 1 & vel[1] > 0);
}

// canvans handler
function drawBackground(bgColor, borderColor){
	drawRect(0, 0, WIDTH, HEIGHT, bgColor, borderColor); // cover the background
}

function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawCircle(x,y,r, bgColor, borderColor) {
	ctx.fillStyle = bgColor;
	ctx.strokeStyle = borderColor;

	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
}

function drawLine(start, end, color){
	ctx.strokeStyle = color;

	ctx.beginPath();
	ctx.moveTo(start[0], start[1]);
	ctx.lineTo(end[0], end[1]);
	ctx.stroke();
}

// centroid (x, y)
function drawRect2(centroid, w, h, bgColor, borderColor){
	ctx.fillStyle = bgColor;
	ctx.strokeStyle = borderColor;

	x = centroid[0] - w / 2;
	y = centroid[1] - h / 2;
	drawRect(x, y, w, h);
}

// start point (left-upper)
function drawRect(x, y, w, h, bgColor, borderColor){
	ctx.fillStyle = bgColor;
	ctx.strokeStyle = borderColor;

	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

// keyboard handler
var KEY_MAP ={
	"up": 38,
	"down": 40,
	"w": 87,
	"s": 83
};


function keyUpHandler(evt){
	var code = evt.keyCode;

	if(code === KEY_MAP.up){
		paddle2_vel[1] += velocity;
	}else if(code === KEY_MAP.down){
		paddle2_vel[1] -= velocity;
	}

	if(code === KEY_MAP.w){
		paddle1_vel[1] += velocity; 
	}else if(code === KEY_MAP.s){
		paddle1_vel[1] -= velocity;
	}
}

function keyDownHandler(evt){
	var code = evt.keyCode;
	console.log(code);

	if(code === KEY_MAP.up){
		paddle2_vel[1] -= velocity;
	}else if(code === KEY_MAP.down){
		paddle2_vel[1] += velocity;
	}

	if(code === KEY_MAP.w){
		paddle1_vel[1] -= velocity; 
	}else if(code === KEY_MAP.s){
		paddle1_vel[1] += velocity;
	}
}


function step(timestamp){
	requestAnimationFrame(step);

	nowTime = Date.now();

	delta = nowTime - beforeTime;

	if(delta > INTERVAL){
		//update time
		beforeTime = nowTime - (delta % INTERVAL);


		//drawing
		clear(); //CLEAR ALL
		drawBackground("white", "black");  // draw the background
		// draw the middle line
		drawLine([WIDTH / 2, 0], [WIDTH / 2, HEIGHT], "black");
		//gutter
		drawLine([PAD_WIDTH, 0], [PAD_WIDTH, HEIGHT], "black");
		drawLine([WIDTH - PAD_WIDTH, 0], [WIDTH - PAD_WIDTH, HEIGHT], "black");

		//update ball
		ball_pos[0] += ball_vel[0];
		ball_pos[1] += ball_vel[1];
		drawCircle(ball_pos[0], ball_pos[1], BALL_RADIUS, "white", "black");

		//update paddle
		if(isPaddleStayCanvans(paddle1_pos, paddle1_vel)){
			paddle1_pos[1] += paddle1_vel[1];
		}
		if(isPaddleStayCanvans(paddle2_pos, paddle2_vel)){
			paddle2_pos[1] += paddle2_vel[1];
		}

		drawRect2(paddle1_pos, PAD_WIDTH, PAD_HEIGHT, "black", "black");
		drawRect2(paddle2_pos, PAD_WIDTH, PAD_HEIGHT, "black", "black");
	}
}

function init(){
	//start new game
	newGame();
	//register key event
	window.addEventListener('keydown', keyDownHandler, false);
	window.addEventListener('keyup', keyUpHandler, false);
	// start frame step
	step(0);
}

init();
})();