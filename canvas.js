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
    this.draw()
}

var canvas;
var c;
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let objects
function init() {

    canvas = document.getElementById('canvas')
    c = canvas.getContext('2d')
    
    canvas.width = innerWidth
    canvas.height = innerHeight
    
    addEventListener('mousemove', event => {
        mouse.x = event.clientX
        mouse.y = event.clientY
        console.log("Moved "+mouse.x);
    })
    
    addEventListener('resize', () => {
        canvas.width = innerWidth
        canvas.height = innerHeight
    
        init()
    })


    objects = []

    for (let i = 0; i < 400; i++) {
        objects.push();
    }
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