class Item {
    constructor(x, y, w, h, speed, color, worth, clicks) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.angle = 0;
	this.polygon = randomPolygon(w, h);
	this.speed = speed;
	this.deleted = false;

	// Game-related stuff.
	this.color = color;
	this.worth = worth;
	this.clicks = clicks;	// When it reaches 0 we can break it.
    }
    
    update(game) {
	this.y += this.speed * game.deltaTime;
	this.angle += (this.speed / 2) * game.deltaTime;

	if(this.y >= game.canvas.height || this.x - this.w < 0 ||
	   this.x > game.canvas.width) {
	    this.deleted = true;
	}
    }

    render(context) {
	context.fillStyle = this.color;
	context.save();
	context.beginPath();

	context.translate(this.x + this.w / 2, this.y + this.h / 2);
	context.rotate(this.angle * Math.PI / 180);
	
	context.moveTo(this.polygon[0].x - this.w / 2, this.polygon[0].y - this.h / 2);
	for (var i = 0; i < this.polygon.length; ++i) {
	    context.lineTo(this.polygon[i].x - this.w / 2, this.polygon[i].y - this.h / 2);
	}
	
	context.closePath();
	context.fill();
	context.restore();
    }
}

class ItemManager {
    constructor() {
	this.items = new Set();
    }

    click(game, x, y) {
	this.items.forEach(function (item) {
	    if (x > item.x - item.w / 2 && x < item.x + item.w / 2 &&
		y > item.y - item.h / 2 && y < item.y + item.h / 2) {
		item.clicks--;
		if (item.clicks == 0) {
		    item.deleted = true;
		    game.addMinerals(item.worth.minerals);
		    game.addPrecious(item.worth.precious);

		    for (var j = 0; j < 4; ++j) {
			for (var i = 0; i < 4; ++i) {
			    game.particleManager.spawn(item.x + (i * item.w / 4), item.y + (j * item.h / 4), item.w / 4, item.h / 4, item.color);
			}
		    }

		    for (var i = 0; i < item.worth.minerals; i++) {
			game.particleManager.spawn(x, y, 10, 10, "gray");
		    }

		    for (var i = 0; i < item.worth.precious; i++) {
			game.particleManager.spawn(x, y, 10, 10, "gold");
		    }
		} else {
		    for (var i = 0; i < Math.floor(Math.random() * 3) + 2; ++i) {
			game.particleManager.spawn(x, y, item.w / 4, item.h / 4, darkenColor(item.color, 20));
		    }
		}
	    }
	}.bind(this));
    }
    
    spawn(w) {
	if (Math.random() > 0.50) {
	    var item = new Item(Math.floor(Math.random() * (w - 75)), -75, 75, 75, 0.1,
				randomColor(0, 360, 60, 75), {minerals: Math.floor(Math.random() * 10),
							      precious: Math.floor(Math.random() * 2)}, 1);
	} else {
	    var item = new Item(Math.floor(Math.random() * (w - 150)), -150, 150, 150, 0.15,
				randomColor(0, 360, 60, 75), {minerals: Math.floor(Math.random() * 30) + 10,
							      precious: Math.floor(Math.random() * 6) + 3}, 3);
	}
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
