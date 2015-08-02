import { cw, ch, ss, colors, theme, sidebarX, shapes, level } from './env.js';
import { move, wall, wallCol, curBrick, nextBrick, score, pause } from './script.js';

let canvas = document.getElementById('canvas');
let ctx = null;

export let engineInit = () => {
	if (canvas && canvas.getContext) {
		ctx = canvas.getContext('2d');
		canvas.width = cw;
		canvas.height = ch;
	}

	ctx.lineWidth = 2;
};

export let render = () => {
	requestAnimationFrame(render);
	move();
};

let setShadow = (color, blur, offsetX, offsetY) => {
	ctx.shadowColor = color || '#000';
	ctx.shadowBlur = blur || 0;
	ctx.shadowOffsetX = offsetX || 0;
	ctx.shadowOffsetY = offsetY || 0;
};

let roundedSquare = (x, y, width, height, radius) => {
	ctx.beginPath();
	ctx.moveTo(x, y + radius);
	ctx.lineTo(x, y + height - radius);
	ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
	ctx.lineTo(x + width - radius, y + height);
	ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
	ctx.lineTo(x + width, y + radius);
	ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
	ctx.lineTo(x + radius, y);
	ctx.quadraticCurveTo(x, y, x, y + radius);

	setShadow('rgba(0,0,0,0.4)', 4, 4, 4);
	ctx.fill();
	setShadow();
	ctx.stroke();
};

let roundedSquareSet = (x, y) => {
	roundedSquare(x, y, ss, ss, ss / 4);
};

let drawBG = () => {
	// square background
	ctx.fillStyle = colors[theme][2];
	ctx.fillRect(0, 0, sidebarX, ch);

	// sidebar
	ctx.fillStyle = colors[theme][0];
	ctx.fillRect(sidebarX, 0, cw - sidebarX, ch);

	// lines
	ctx.strokeStyle = colors[theme][1];
	for (let i = 0; i < sidebarX; i += ss) {
		for (let j = 0; j < ch; j += ss) {
			ctx.strokeRect(i, j, ss, ss);

		}
	}

	// wall
	ctx.strokeStyle = colors[theme][10];
	for (let i = 0; i < 180; i++) {
		if (wall[i] === 1) {
			ctx.fillStyle = colors[theme][wallCol[i] + 3];
			roundedSquareSet(i % 10 * ss, Math.floor(i / 10) * ss);
		}
	}
};

let drawCurBrick = () => {
	ctx.fillStyle = colors[theme][curBrick.shape + 3];
	ctx.strokeStyle = colors[theme][10];

	for (let i = 0; i < 16; i++) {
		if (shapes[curBrick.shape][curBrick.rotation * 16 + i]) {
			roundedSquareSet((Math.floor(i % 4) + curBrick.x) * ss, (Math.floor(i / 4) + curBrick.y) * ss);
		}
	}
};

let drawSidebar = () => {
	ctx.fillStyle = colors[theme][nextBrick.shape + 3];
	for (let i = 0; i < 16; i++) {
		if (shapes[nextBrick.shape][nextBrick.rotation * 16 + i]) {
			roundedSquareSet((Math.floor(i % 4) + 11) * ss, (Math.floor(i / 4) + 1) * ss + ss);
		}
	}

	setShadow(colors[theme][2], 2, 2, 2);

	// score
	ctx.fillStyle = colors[theme][10];
	ctx.font = '24px \'Press Start 2P\'';
	ctx.fillText('Next', sidebarX + 20, 30);
	ctx.fillText('Score', sidebarX + 10, 360);
	ctx.fillText(score, sidebarX + 20, 400);
	ctx.fillText('Level', sidebarX + 10, 480);
	ctx.fillText(level, sidebarX + 20, 520);

	// pause
	ctx.fillStyle = '#ff0';
	if (pause) {
		ctx.fillText('Pause', sidebarX + 10, 300);
	}

	setShadow();
};


export let draw = () => {
	ctx.clearRect(0, 0, cw, ch);
	drawBG();
	drawCurBrick();
	drawSidebar();
};
