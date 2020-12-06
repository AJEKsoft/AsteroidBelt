class Game {
    constructor() {
	this.canvas = document.getElementById("canvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	
	this.context = canvas.getContext("2d");
	this.lastTime = 0;
	this.deltaTime = 0;
	this.elapsedFrames = 0;

	this.request = requestAnimationFrame(this.loop.bind(this));
	this.clicking = false;
	
	this.canvas.addEventListener("mousedown", this.click.bind(this));

	this.minerals = 0;
	this.precious = 0;
	this.background = new Background(this.canvas.width, this.canvas.height);
	this.itemManager = new ItemManager();
	this.particleManager = new ParticleManager();
    }

    // requestAnimationFrame supplies an accurate timestamp in
    // miliseconds.
    loop(timestamp) {		  
	this.update(timestamp);
	this.render();
	this.request = requestAnimationFrame(this.loop.bind(this));
    }
    
    update(timestamp) {
	this.elapsedFrames++;
	this.deltaTime = (timestamp - this.lastTime);
	this.lastTime = timestamp;

	this.background.update(this);
	this.particleManager.update(this);
	this.itemManager.update(this);
    }

    click(event) {
	event.preventDefault();
	this.itemManager.click(this, event.offsetX, event.offsetY);
    }

    render() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.background.render(this.context);
	this.itemManager.render(this.context);
	this.particleManager.render(this.context);
    }

    addMinerals(n) {
	let node = document.getElementById("minerals");
	let dummy = this.minerals;
	this.minerals = this.minerals + n;
	let interval = setInterval(function() {
	    if (dummy == this.minerals) {
		clearInterval(interval);
	    } else {
		node.innerText = "Minerals: " + (dummy++);
	    }
	}.bind(this), 500 / n);
    }

    addPrecious(n) {
	let node = document.getElementById("precious");
	let dummy = this.precious;
	this.precious = this.precious + n;
	let interval = setInterval(function() {
	    if (dummy == this.precious) {
		clearInterval(interval);
	    } else {
		node.innerText = "Precious: " + (dummy++);
	    }
	}.bind(this), 500 / n);
    }
    
    pause() {

    }

    unpause() {

    }
}
