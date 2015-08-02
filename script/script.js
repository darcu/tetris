/*
new tetris Quad 1.0b

bugz:
 - scoru e futut
 - themes length for theme button

todo:
 		//- scalable, replace fixed sizes with vars
 - +/- buttons
 - mobile responsive design
 - mouse input - click rotate / rclick go down
 - touch input
 - animations with set interval
 - rounded corners with pixel transparency, manipulation
 - gradients / better graphics
 - space go down
 - sunete
 - smoother shit
 - move with one
 - pause when land/hit
 - font loading
 - full retro classic theme: coffee cup icon pause

 - offline app
 - graphic library crap for game canvas fuck yea
 - 3D webgl shit game shit fuck yea

 http://diveintohtml5.info/canvas.html

 */

var canvas = document.getElementById('canvas');
var ctx = null;
var wall = [];
var wallCol = [];

// game vars
var moving, pause, score, curBrick, nextBrick, wall, wallCol, theme, advanceId, moveId;

var oneTimeIni = function() {
	engineInit();
	requestAnimationFrame(render);
};

var iniVars = function() {
	moving = 0;
	pause = 0;
	score = 0;
	curBrick = {
		x: 4,
		y: 0,
		shape: 0,
		rotation: 0
	};
	nextBrick = {
		shape: 0,
		rotation: 0
	};
	for (i = 0; i < 180; i++) {
		wall[i] = 0;
	}
};

var ini = function() {
	oneTimeIni();
	iniVars();

	curBrick.shape = Math.floor(Math.random() * 7);
	curBrick.rotation = Math.floor(Math.random() * 4);

	nextBrick.shape = Math.floor(Math.random() * 7);
	nextBrick.rotation = Math.floor(Math.random() * 4);

	setSpeed(speed[level]);

	draw();
};

var setSpeed = function(speed) {
	if (advanceId) clearInterval(advanceId);
	advanceId = setInterval(advance, 500 / speed);
}

var anotherBrickInTheWall = function() {
	for (i = 0; i < 16; i++) {
		if (shapes[curBrick.shape][curBrick.rotation * 16 + i]) {
			wall[(curBrick.y + Math.floor(i / 4)) * 10 + curBrick.x + i % 4] = 1;
			wallCol[(curBrick.y + Math.floor(i / 4)) * 10 + curBrick.x + i % 4] = curBrick.shape;
		}
	}
};

var newBrick = function() {
	curBrick.x = 4;
	curBrick.y = 0;

	curBrick.shape = nextBrick.shape;
	curBrick.rotation = nextBrick.rotation;

	nextBrick.shape = Math.floor(Math.random() * 7);
	nextBrick.rotation = Math.floor(Math.random() * 4);

	draw();

	if (noTouch('down') == 0) {
		console.log('die');
		pause = true;
	}
};

var clearLines = function() {
	var check, line = false,
		minus = 0;
	check = checkLines();

	if (check[0] != undefined) {
		tempWall = new Array();
		tempWall = wall;

		tempWallCol = new Array();
		tempWallCol = wallCol;

		for (var i = 17; i >= 0; i--) {
			for (var k = 0; k < check.length; k++) {
				if (check[k] == i) {
					//console.log('logg');
					line = true;
					break;
				}
			}
			if (line == false) {
				//console.log('logxg');
				for (j = i * 10; j < i * 10 + 10; j++) {
					wall[j + (minus * 10)] = tempWall[j];
					wallCol[j + (minus * 10)] = tempWallCol[j];
				}
			} else {
				minus++;
				line = false;
			}
		}
	}
};

var checkLines = function() {
	//console.log('log');

	var ret = new Array();

	var clear = false;
	var cnt = 0;

	for (var i = 0; i < 18; i++) {
		clear = false;
		for (var j = 0; j < 10; j++) {
			if (wall[i * 10 + j] == 0) {
				clear = true;
				break;
			}
		}
		if (!clear) {
			ret[cnt] = i;
			cnt++;
		}
	}
	if (cnt > 0) {
		var tmpScore = score;
		score = score + 100 * Math.pow(2, cnt - 1);

		level = level + Math.round(score / 1000);
		if (level + 1 >= speed.length)
			level = speed.length;
	}

	return ret;
};

var endBrick = function() {
	draw();

	moving = 0;

	anotherBrickInTheWall();
	clearLines();
	newBrick();
};

var advance = function() {
	if (!pause) {
		curBrick.y++;
		if (noTouch('down') == 0) {
			curBrick.y--;
			endBrick();
		}
		draw();
	}
};

var noTouch = function(where) {
	var left = 0,
		right = 0,
		down = 0;

	for (i = 0; i < 16; i++) {
		if (shapes[curBrick.shape][curBrick.rotation * 16 + i]) {
			//  console.log('not if');
			if (curBrick.x + i % 4 > 9) {
				//console.log('no toci right 2 ');
				right = 1;
			} else if (
				wall[(curBrick.y + Math.floor(i / 4)) * 10 + curBrick.x + i % 4] === 1) {
				// console.log('no toci right ');
				right = 1;
			}

			if (curBrick.x + i % 4 < 0)
				left = 1;
			else if (wall[(curBrick.y + Math.floor(i / 4)) * 10 + curBrick.x + i % 4] == 1) {
				//console.log('no toci left');
				left = 1;
			}

			if (curBrick.y + Math.floor(i / 4) > 17 || wall[(curBrick.y + Math.floor(i / 4)) * 10 + curBrick.x + i % 4])
				down = 1;
		}
	}

	//console.log ('not ' + where);
	if (where == 'right' && right == 1) {
		//console.log('right blocked');
		return 0;
	}
	if (where == 'left' && left == 1) {
		//console.log('left blocked');
		return 0;
	}
	if (where == 'down' && down == 1) {
		return 0;
	}
	if (where == 'rotate' && (right == 1 || left == 1 || down == 1)) {
		// console.log('rotate');
		return 0;
	}
	//console.log ('ret 1');
	return 1;

	//return right + left + down;
};

var moveRight = function() {
	curBrick.x++;
	//console.log('no toci = ' + noTouch() );
	if (noTouch('right') == 0) {
		//console.log (curBrick.x);
		curBrick.x--;
	}
};

var moveLeft = function() {
	curBrick.x--;
	//console.log('no toci 2 = ' + noTouch() );
	if (noTouch('left') == 0) {
		//console.log(noTouch());
		curBrick.x++;
	}
};

var moveDown = function(argument) {
	curBrick.y++;
	//console.log('no toci = 3 ' + noTouch() );
	if (noTouch('down') == 0) {
		curBrick.y--;
	}
};

var move = function() {
	if (!pause && moving != 0) {
		switch (moving) {
			case 1:
				moveRight();
				draw();
				break;
			case -1:
				moveLeft();
				draw();
				break;
			case 2:
				moveDown();
				draw();
				break;
		}
	}
};

var moveOne = function(where) {
	if (!pause && moving == 0) {
		switch (where) {
			case 1:
				curBrick.x++;
				//console.log('no toci = ' + noTouch() );
				if (noTouch('right') == 0) {
					//console.log (curBrick.x);
					curBrick.x--;
				}
				draw();
				break;
			case -1:
				curBrick.x--;
				//console.log('no toci 2 = ' + noTouch() );
				if (noTouch('left') == 0) {
					//console.log(noTouch());
					curBrick.x++;
				}
				draw();
				break;
			case 2:
				curBrick.y++;
				//console.log('no toci = 3 ' + noTouch() );
				if (noTouch('down') == 0) {
					curBrick.y--;
				}
				draw();
				break;
		}
	}
};

var rotate = function() {
	if (!pause) {
		//console.log( '1 rotate: ' + curBrick.rotation + ' noTouch: ' + noTouch() );
		if (curBrick.rotation < 3) {
			//  console.log( 'rotate: ' + curBrick.rotation + ' noTouch: ' + noTouch() );
			curBrick.rotation++;
			if (noTouch('rotate') == 0) {
				if (noTouch('down') == 0) {
					curBrick.rotation--;
				} else {
					while (noTouch('right') == 0 && noTouch('left') == 1) {
						curBrick.x--;
					}
					while (noTouch('right') == 1 && noTouch('left') == 0) {
						curBrick.x++;
					}
					//else
					//curBrick.rotation--;
				}
			}
		} else if (curBrick.rotation == 3) {
			curBrick.rotation = 0;
			if (noTouch('rotate') == 0) {
				if (noTouch('down') == 0) {
					curBrick.rotation = 3;
				} else {
					while (noTouch('right') == 0 && noTouch('left') == 1) {
						curBrick.x--;
					}
					while (noTouch('right') == 1 && noTouch('left') == 0) {
						curBrick.x++;
					}
					//else
					//curBrick.rotation = 3;
				}
			}
		}
		draw();
	}
};

window.onload = ini();
