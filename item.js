class Item {
    constructor(x, y, w, h, speed, color, worth) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.polygon = randomPolygon(w, h);
	this.speed = speed;
	this.deleted = false;

	// Game-related stuff.
	this.color = color;
	this.worth = worth;
    }
    
    update(game) {
	this.y += this.speed * game.deltaTime;

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

class ItemManager {
    constructor() {
	this.items = new Set();
    }

    click(game, x, y) {
	this.items.forEach(function (item) {
	    if (x > item.x && x < item.x + item.w &&
		y > item.y && y < item.y + item.h) {
		item.deleted = true;

		for (var j = 0; j < 4; ++j) {
		    for (var i = 0; i < 4; ++i) {
			game.particleManager.spawn(item.x + (i * item.w / 4), item.y + (j * item.h / 4), item.w / 4, item.h / 4, item.color);
		    }
		}

		for (var i = 0; i < item.worth.coins; i++) {
		    game.particleManager.spawn(x, y, 10, 10, "gold");
		}

		for (var i = 0; i < item.worth.gems; i++) {
		    game.particleManager.spawn(x, y, 10, 10, "green");
		}

	    }
	}.bind(this));
    }
    
    spawn(w) {
	var item = new Item(Math.floor(Math.random() * (w - 75)), -75, 75, 75, 0.3,
			    randomColor(0, 360, 60, 75), {coins: Math.floor(Math.random() * 10),
							  gems: Math.floor(Math.random() * 2)});
	this.items.add(item);
    }
    
    update(game) {
	if (game.elapsedFrames % 100 == 0) {
	    this.spawn(game.canvas.width);
	}
	
	this.items.forEach(function(item) {
	    item.update(game);

	    if(item.deleted) {
		this.items.delete(item);
	    }
	}.bind(this));
    }
    
    render(context) {
	this.items.forEach(function(item) {
	    item.render(context);
	});		  
    }
}
