class Particle {
    constructor(x, y, w, h, velX, velY, color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.polygon = randomPolygon(w, h);
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.deleted = false;
    }

    update(game) {
	this.velY += 0.01 * game.deltaTime;
	
	this.x += this.velX;
	this.y += this.velY;

	if(this.y >= game.canvas.height || this.x - this.w < 0 ||
	   this.x > game.canvas.width) {
	    this.deleted = true;
	}
    }

    render(context) {
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(this.x + this.polygon[0].x, this.y + this.polygon[0].y);
	for (var i = 0; i < this.polygon.length; ++i) {
	    context.lineTo(this.x + this.polygon[i].x, this.y + this.polygon[i].y);
	}
	context.closePath();
	context.fill();
    }
}

class ParticleManager {
    constructor() {
	this.particles = new Set();
    }

    spawn(x, y, w, h, color) {
	var particle = new Particle(x, y, w, h, (Math.random() * 4) - 2, (Math.random() * 5) - 5, color);
	this.particles.add(particle);
    }
    
    update(game) {
	this.particles.forEach(function(particle) {
	    particle.update(game);

	    if(particle.deleted) {
		this.particles.delete(particle);
	    }
	}.bind(this))
    }
    
    render(context) {
	this.particles.forEach(function(particle) {
	    particle.render(context);
	})		  
    }
}