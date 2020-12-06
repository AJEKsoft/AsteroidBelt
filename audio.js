class AudioManager {
    constructor() {
	this.audios = new Map([
	    ["sfx",
	     new Map([
		 ["break", [new Audio("audio/break1.ogg"), new Audio("audio/break2.ogg"), new Audio("audio/break3.ogg")]]
	     ])]
	]);
    }

    playSFX(audio) {
	let sfxs = this.audios.get("sfx").get(audio);
	let sfx = sfxs[Math.floor(Math.random() * sfxs.length)];
	sfx.pause();
	sfx.currentTime = 0;
	sfx.play();
    }
}
