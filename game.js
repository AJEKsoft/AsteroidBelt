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
	this.canvas.addEventListener("touchstart", this.click.bind(this));

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
	this.itemManager.click(this, event.pageX, event.pageY);
    }

    render() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.background.render(this.context);
	this.particleManager.render(this.context);
	this.itemManager.render(this.context);
    }
    
    pause() {

    }

    unpause() {

    }
}
