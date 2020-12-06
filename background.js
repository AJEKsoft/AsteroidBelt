class Star {
    constructor(x, y, w, h, color) {
	this.x = x;
	this.y = y;
	this.polygon = randomPolygon(w, h);
	this.centroid = polygonCentroid(this.polygon);
	this.radius = polygonRadius(this.polygon);
	this.color = color;
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

class BackgroundElement {
    constructor(h, speed, data) {
	this.y = 0;
	this.h = h;
	this.speed = speed;
	this.image = new Image();
	this.image.src = data;
    }

    update(game) {
	this.y += this.speed * game.deltaTime;

	if (this.y > this.h) {
	    this.y = 0;
	}
    }

    render(context) {
	context.drawImage(this.image, 0, this.y - this.h);
	context.drawImage(this.image, 0, this.y);
    }
}

class Background {
    constructor(game) {
	this.elements = new Set();
	
	let w = game.canvas.width;
	let h = game.canvas.height;
	
	let stars1 = new Set();
	let stars2 = new Set();
	let stars3 = new Set();

	for (var i = 0; i < 100; ++i) {
	    let star = new Star(Math.floor(Math.random() * (w - 10)), Math.floor(Math.random() * (h - 10)), 10, 10, randomColor(0, 360, 20, 100));
	    stars1.add(star);
	}

	for (var i = 0; i < 100; ++i) {
	    let star = new Star(Math.floor(Math.random() * (w - 5)), Math.floor(Math.random() * (h - 5)), 5, 5, randomColor(0, 360, 20, 75));
	    stars2.add(star);
	}

	for (var i = 0; i < 100; ++i) {
	    let star = new Star(Math.floor(Math.random() * (w - 2)), Math.floor(Math.random() * (h - 2)), 2, 2, randomColor(0, 360, 20, 50));
	    stars3.add(star);
	}

	game.context.clearRect(0, 0, w, h);
	stars1.forEach(function(star) {
	    star.render(game.context);
	})

	this.elements.add(new BackgroundElement(h, 0.05, game.canvas.toDataURL("image/png")));

	game.context.clearRect(0, 0, w, h);
	stars2.forEach(function(star) {
	    star.render(game.context);
	});

	this.elements.add(new BackgroundElement(h, 0.03, game.canvas.toDataURL("image/png")));

	game.context.clearRect(0, 0, w, h);
	stars3.forEach(function(star) {
	    star.render(game.context);
	});

	this.elements.add(new BackgroundElement(h, 0.01, game.canvas.toDataURL("image/png")));

	game.context.clearRect(0, 0, w, h);
    }

    update(game) {
	this.elements.forEach(function(element) {
	    element.update(game);
	})
    }
    
    render(context) {
	this.elements.forEach(function(element) {
	    element.render(context);
	})		  
    }
}
