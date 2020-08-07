let b = document.getElementById("play");

let soundFiles = ["background_song1.mp3","bass_effect1.wav","bass_effect2.wav","finish.wav"]
let sounds = []

for (let i = 0; i < soundFiles.length; i++) {
	sounds.push(new Audio("./sounds/" + soundFiles[i]));
}

function playSound(i) {
	(new Audio("./sounds/" + soundFiles[i])).play();
}

b.addEventListener("click", function() {
	sounds[0].play();
	setInterval(() => {
		tmp();
	}, 5);


	setInterval(() => {
		makeBeats();
	}, 700);
});

let body = document.querySelector("body");

let ADown = false;
let SDown = false;

body.addEventListener("keydown", function(e) {
	if (e.key == "a" || e.key=="A") {
		playSound(1);
		ADown = true;
		gradeBeat("a");
		
	} else if (e.key == "s" || e.key=="S") {
		playSound(2);
		SDown = true;
		gradeBeat("s");
	}
});

body.addEventListener("keyup", function(e) {
	if (e.key == "a" || e.key=="A") {
		ADown = false;
		
	} else if (e.key == "s" || e.key=="S") {
		SDown = false;
	}
});


let c1_size = 75;
let c2_size = c1_size * 3/4;


let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

ctx.font = '48px allerbold';
ctx.textAlign = 'center';

function drawBase() {
	ctx.fillStyle = "#000";
	ctx.beginPath();
	ctx.arc(500, 300, c1_size, 0, Math.PI * 2, true); 
	ctx.moveTo(575, 300);
	ctx.stroke();
	ctx.beginPath();
	if (ADown || SDown) {
		ctx.arc(500, 300, c2_size*0.9, 0, Math.PI * 2, true); 
	} else {
		ctx.arc(500, 300, c2_size, 0, Math.PI * 2, true); 
	}
	ctx.fill();
}

function drawCircle(x, y) {
	ctx.fillStyle = "#16d969";
	ctx.beginPath();
	ctx.arc(x, y, c2_size, 0, Math.PI * 2, true); 
	ctx.fill();
}

let beats = [];

function addBeat(dir) {
	let beat = {}
	beat.dir = dir;
	beat.alive = true;
	if (dir == "left") {
		beat.x = 250;
	} else {
		beat.x = 750;
	}
	beat.y = 300;
	beats.push(beat);
}

let c_x = 250;
let c_y = 300;

let textmsg = "";
let msgiters = 0;

function tmp() {
	ctx.clearRect(0,0,1000,600);
	drawBase();
	
	ctx.strokeText(textmsg, 500, 150);
	if (msgiters > 80) {
		msgiters = 0;
		textmsg = "";
	}
	msgiters += 1
	
	
	for (let i = 0; i < beats.length; i++) {
		let beat = beats[i];
		if (!beat.alive) continue;
		
		drawCircle(beat.x, beat.y);
		if (beat.dir == "right") {
			beat.x += -2.5;
		} else {
			beat.x += 2.5;
		}
		
		let killLeft = beat.dir == "left" && beat.x-50 > 500;
		let killRight = beat.dir == "right" && beat.x+50 < 500;
		
		if (killLeft || killRight) {
			beat.alive = false;
			showText("Missed Beat");
		}
	}
}

function gradeBeat(key) {
	let dir = "";
	if (key == "a") {
		dir = "left";
	} else {
		dir = "right";
	}
	
	let noBeat = true;
	for (let i = 0; i < beats.length; i++) {
		let beat = beats[i];
		if (beat.dir != dir) continue;
		if (!beat.alive) continue;
		
		if (beat.x > 450 && beat.x < 550) {
			showText("good hit");
			beat.alive = false;
			noBeat = false;
		}
	}
	
	if (noBeat) {
		showText("no beat");
	}
	
		
}

function makeBeats() {
	let directionR = Math.random() > 0.5;
	if (directionR) {
		addBeat("left");
	} else {
		addBeat("right");
	}
}

function showText(text) {
	textmsg = text;
	msgiters = 0;
}

drawBase();
