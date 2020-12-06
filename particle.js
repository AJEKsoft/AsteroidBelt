class Particle {
    constructor(x, y, w, h, velX, velY, color) {
	this.x = x;
	this.y = y;
	this.polygon = randomPolygon(w, h);
	this.centroid = polygonCentroid(this.polygon);
	this.radius = polygonRadius(this.polygon);
	this.angle = 0;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.deleted = false;
    }

    update(game) {
	this.velY += 0.01 * game.deltaTime;
	this.angle = this.velX * this.velY * game.deltaTime;
	
	this.x += this.velX;
	this.y += this.velY;

	if(this.y - this.radius - this.centroid.y >= game.canvas.height || this.x - this.radius - this.centroid.x < 0 ||
	   this.x > game.canvas.width) {
	    this.deleted = true;
	}
    }

    render(context) {
	context.fillStyle = this.color;
	context.save();
	context.beginPath();

	context.translate(this.x - this.centroid.x, this.y - this.centroid.y);
	context.rotate(this.angle * Math.PI / 180);

	context.moveTo(this.polygon[0].x - this.centroid.x, this.polygon[0].y - this.centroid.y);
	for (var i = 0; i < this.polygon.length; ++i) {
	    context.lineTo(this.polygon[i].x - this.centroid.x, this.polygon[i].y - this.centroid.y);
	}
	
	context.closePath();
	context.fill();
	context.restore();
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
