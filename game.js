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
	this.background = new Background(this);
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
	this.itemManager.click(this, event.pageX, event.pageY);
    }

    render() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.background.render(this.context);
	this.itemManager.render(this.context);
	this.particleManager.render(this.context);
    }

    addMinerals(n) {
	let node = document.getElementById("minerals");
	this.minerals = this.minerals + n;
	node.innerText = "Minerals: " + this.minerals;
    }

    addPrecious(n) {
	let node = document.getElementById("precious");
	this.precious = this.precious + n;
	node.innerText = "Precious: " + this.precious;
    }
    
    pause() {

    }

    unpause() {

    }
}
