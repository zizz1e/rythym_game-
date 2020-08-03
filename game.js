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
});

let body = document.querySelector("body");

body.addEventListener("keydown", function(e) {
	console.log(e.key);
	if (e.key == "a" || e.key=="A") {
		playSound(1);
	} else if (e.key == "s" || e.key=="S") {
		playSound(2);
	}
});

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(900,550);
ctx.stroke();
ctx.beginPath() 
ctx.arc(95,50,40,0,2 *Math.PI);
ctx.stroke();