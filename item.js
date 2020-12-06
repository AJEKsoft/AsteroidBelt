class Item {
    constructor(x, y, w, h, speed, color, worth, clicks) {
	this.x = x;
	this.y = y;
	this.polygon = randomPolygon(w, h);
	this.centroid = polygonCentroid(this.polygon);
	this.radius = polygonRadius(this.polygon);
	this.angle = 0;
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

class ItemManager {
    constructor() {
	this.items = new Set();
    }

    click(game, x, y) {
	this.items.forEach(function (item) {
	    let relx = item.x - item.centroid.x;
	    let rely = item.y - item.centroid.y;
	    if (Math.hypot(x - relx, y - rely) < item.radius) {
		item.clicks--;
		if (item.clicks == 0) {
		    item.deleted = true;
		    game.addMinerals(item.worth.minerals);
		    game.addPrecious(item.worth.precious);

		    for (var j = 0; j < 4; ++j) {
			for (var i = 0; i < 4; ++i) {
			    game.particleManager.spawn(relx, rely, item.radius / 4, item.radius / 4, item.color);
			}
		    }

		    for (var i = 0; i < item.worth.minerals; i++) {
			game.particleManager.spawn(relx, rely, 10, 10, "gray");
		    }

		    for (var i = 0; i < item.worth.precious; i++) {
			game.particleManager.spawn(relx, rely, 10, 10, "gold");
		    }
		} else {
		    for (var i = 0; i < Math.floor(Math.random() * 3) + 2; ++i) {
			game.particleManager.spawn(relx, rely, item.radius / 4, item.radius / 4, darkenColor(item.color, 20));
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
