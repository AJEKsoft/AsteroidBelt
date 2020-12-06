function hsl(hue, saturation, lightness) {
    return "hsl(" + hue + ',' + saturation + '%,' + lightness + '%)';
}


function darkenColor(color, by) {
    let components = /hsl\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/.exec(color);
    let hue = components[1];
    let saturation = components[2];
    let lightness = components[3];

    return hsl(hue, saturation, parseInt(lightness) - by);
}

function randomColor(min, max, saturation, lightness) {
    return hsl(getRandomInt(min, max), saturation, lightness);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomPolygon(w, h) {
    var points = [];
    points.push({x: 0, y: 0});
    points.push({x: getRandomInt(w / 2, w), y: getRandomInt(0, (h / 2))});
    points.push({x: getRandomInt(w / 2, w), y: getRandomInt(h / 2, h)});
    points.push({x: getRandomInt(0, w / 2), y: getRandomInt(h / 2, h)});
    return points;
}

function polygonCentroid(polygon) {
    let x = 0;
    let y = 0;
    for (var i = 0; i < polygon.length; ++i) {
	x += polygon[i].x;
	y += polygon[i].y;
    }
    return {x: x / polygon.length, y: y / polygon.length}
}

function polygonRadius(polygon) {
    let centroid = polygonCentroid(polygon);
    let result = 0;

    for (var i = 0; i < polygon.length; ++i) {
	let dist = Math.hypot(centroid.x - polygon[i].x, centroid.y - polygon[i].y);
	if (dist > result) {
	    result = dist;
	}		
    }
    
    return result;
}
