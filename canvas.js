var canvas;
var c;
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
let objects
let ring
let accelerator = 1
let loopIndex = 0

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function Object(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Object.prototype.update = function() {
    setTimeout(function() {
        ring.y = ring.y+accelerator;
    }, 500);

    if(loopIndex % 10 === 0)
        accelerator++;

    if(ring.y >= innerHeight)
        ring.y = -20;

    this.draw()
    loopIndex++;
}

function init() {

    canvas = document.getElementById('canvas')
    c = canvas.getContext('2d')
    
    canvas.style.cursor = 'none';
    canvas.width = innerWidth
    canvas.height = innerHeight
    
    addEventListener('mousemove', event => {
        mouse.x = event.clientX
        mouse.y = event.clientY
    })
    
    addEventListener('resize', () => {
        canvas.width = innerWidth
        canvas.height = innerHeight
    })

    ring = new Object(innerWidth/2,-20,15,'#2185C5');
    objects = [ring]

    objects.push();
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillText('Catch DA ring', mouse.x, mouse.y)
    objects.forEach(object => {
        object.update();
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    init()
    animate()
});