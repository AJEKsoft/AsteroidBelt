function randomColor(min, max, saturation, lightness) {
    return "hsl(" + getRandomInt(min, max) + ',' + saturation + '%,' + lightness + '%)';
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
