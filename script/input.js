var keyIsDown = false;

var keydown = function(e) {
	if (e.keyCode === 39) { //right
		keyIsDown = true;

		moveRight();

		setTimeout(function() {
			if (keyIsDown) {
				console.log('set moving', keyIsDown, moving);
				moving = 1;
			}
		}, 200);
	} else if (e.keyCode === 37) { //left
		keyIsDown = true;

		moveLeft();

		setTimeout(function() {
			if (keyIsDown) {
				console.log('set moving', keyIsDown, moving);
				moving = -1;
			}
		}, 200);


		// moving = -1;

	} else if (e.keyCode === 40) { //down
		keyIsDown = true;

		moveDown();
		setTimeout(function() {
			if (keyIsDown) {
				console.log('set moving', keyIsDown, moving);
				moving = 2;
			}
		}, 200);


		// moving = 2;

	}

	console.log('key ' + e.keyCode, keyIsDown, moving);


	//else if ( e.keyCode === 32 )
	//    hard down
};

var keyup = function(e) {
	if ((e.keyCode === 39 && moving === 1) || (e.keyCode === 37 && moving === -1) || (e.keyCode === 40 && moving === 2)) {
		//console.log('uppy');

		keyIsDown = false;
		moving = 0;
	}
	if (e.keyCode === 38)
		rotate();
	if (e.keyCode === 27) {
		pause = !pause;
		draw();
	}
};

addEventListener('keydown', keydown);
addEventListener('keyup', keyup);


var pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', function() {
	pause = !pause;
	alert('Alert!');
	draw();
}, false);

var newButton = document.getElementById('newGame');
newButton.addEventListener('click', function() {
	ini();
}, false);

var themeButton = document.getElementById('theme');
themeButton.addEventListener('click', function() {
	if (theme < 5)
		theme++;
	else
		theme = 0;
	// document.getElementById('canvas').style.border = '8px solid ' + colors[theme][10];
	draw();
}, false);

var levelButton = document.getElementById('level');
levelButton.addEventListener('click', function() {
	// ini();
	// console.log('moar speed ' + speed[level] + ' ' + speed.length);
	pause = 1;
	if (level + 1 >= speed.length)
		level = -1;
	setSpeed(speed[++level]);

	draw();
}, false);

