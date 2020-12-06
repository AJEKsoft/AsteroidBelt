class Star {
    constructor(x, y, w, h, color, speed) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.polygon = randomPolygon(w, h);
	this.color = color;
	this.speed = speed;
    }

    update(game) {
	this.y += this.speed * game.deltaTime;

	if(this.y >= game.canvas.height) {
	    this.y = -this.h;
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

class Background {
    constructor(w, h) {
	this.stars = new Set();

	// Big stars.
	for (var i = 0; i < 40; ++i) {
	    let star = new Star(Math.floor(Math.random() * (w - 10)), Math.floor(Math.random() * (h - 10)), 10, 10, randomColor(0, 360, 20, 100), 0.1);
	    this.stars.add(star);
	}

	// Medium stars.
	for (var i = 0; i < 70; ++i) {
	    let star = new Star(Math.floor(Math.random() * (w - 5)), Math.floor(Math.random() * (h - 5)), 5, 5, randomColor(0, 360, 20, 75), 0.05);
	    this.stars.add(star);
	}

	// Small stars.
	for (var i = 0; i < 100; ++i) {
	    let star = new Star(Math.floor(Math.random() * (w - 2)), Math.floor(Math.random() * (h - 2)), 2, 2, randomColor(0, 360, 20, 50), 0.03);
	    this.stars.add(star);
	}

    }

    update(game) {
	this.stars.forEach(function(star) {
	    star.update(game);
	}.bind(this))
    }
    
    render(context) {
	this.stars.forEach(function(star) {
	    star.render(context);
	})		  
    }
}
