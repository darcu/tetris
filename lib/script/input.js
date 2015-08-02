import {
	getMoving, setMoving, moveLeft, moveRight, moveDown, pause, rotate, ini, setSpeed
}
from './script.js';

import {
	draw
}
from './engine.js';

import {
	theme, level, speed
} from './env.js';

let keyIsDown = false;

let keydown = (e) => {
	if (e.keyCode === 39) { // right
		keyIsDown = true;

		moveRight();

		setTimeout(() => {
			if (keyIsDown) {
				console.log('set moving', keyIsDown, getMoving());
				setMoving(1);
			}
		}, 200);
	} else if (e.keyCode === 37) { // left
		keyIsDown = true;

		moveLeft();

		setTimeout(() => {
			if (keyIsDown) {
				console.log('set moving', keyIsDown, getMoving());
				setMoving(-1);
			}
		}, 200);


		// moving = -1;

	} else if (e.keyCode === 40) { // down
		keyIsDown = true;

		moveDown();
		setTimeout(() => {
			if (keyIsDown) {
				console.log('set moving', keyIsDown, getMoving());
				setMoving(2);
			}
		}, 200);


		// moving = 2;

	}

	console.log('key ' + e.keyCode, keyIsDown, getMoving());


	// else if ( e.keyCode === 32 )
	//    hard down
};

let keyup = (e) => {
	if (
		(e.keyCode === 39 && getMoving() === 1) ||
		(e.keyCode === 37 && getMoving() === -1) ||
		(e.keyCode === 40 && getMoving() === 2)
	) {
		keyIsDown = false;
		setMoving(0);
	}
	if (e.keyCode === 38) {
		rotate();
	}
	if (e.keyCode === 27) {
		pause = !pause;
		draw();
	}
};

addEventListener('keydown', keydown);
addEventListener('keyup', keyup);


let pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', () => {
	pause = !pause;
	draw();
}, false);

let newButton = document.getElementById('newGame');
newButton.addEventListener('click', () => {
	ini();
}, false);

let themeButton = document.getElementById('theme');
themeButton.addEventListener('click', () => {
	if (theme < 5) {
		theme++;
	} else {
		theme = 0;
	}
	// document.getElementById('canvas').style.border = '8px solid ' + colors[theme][10];
	draw();
}, false);

let levelButton = document.getElementById('level');
levelButton.addEventListener('click', () => {
	// ini();
	// console.log('moar speed ' + speed[level] + ' ' + speed.length);
	pause = 1;
	if (level + 1 >= speed.length) {
		level = -1;
	}
	setSpeed(speed[++level]);

	draw();
}, false);
