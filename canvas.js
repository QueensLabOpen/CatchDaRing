var canvas;
var c;
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
let objects
let ring
let accelerator = .01
let acceleratorFactor = 0.1
let loopIndex = 0
let centerCircle
let lifes = 3
let score = 0

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

function resetCenterCircle() {
    setTimeout(function() {
        centerCircle.color = 'yellow';
    }, 200);
}

function looseLife() {
    lifes--;
    centerCircle.color = 'red';
    resetCenterCircle()
    setStats(lifes, score)
}

function incrementScore() {
    score += 10;
    centerCircle.color = 'green';
    resetCenterCircle()
    setStats(lifes, score)
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Object.prototype.update = function(cb) {
    setTimeout(function() {
        ring.y = ring.y+accelerator;
    }, 500);

    if(loopIndex % 16 === 0)
        accelerator += acceleratorFactor;

    if(loopIndex % 512 == 0)
        acceleratorFactor /= 2

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

    centerCircle = new Object(innerWidth/2, innerHeight/2, 40, 'yellow')
    ring = new Object(innerWidth/2,-20,15,'#2185C5');
    objects = [centerCircle, ring]

    objects.push();

    document.addEventListener('click', (e) => {
        let startY = centerCircle.y - 40;
        let endY = centerCircle.y + 40;

        if(ring.y + 7.5 < startY || ring.y - 7.5 > endY)
            looseLife();
        else
            incrementScore();
    })

    setStats(lifes, score)
}

function animate() {
    if (lifes > 0) {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        c.fillText('Tap to trap', mouse.x, mouse.y)
        objects.forEach(object => {
            object.update();
        });
    } else {
        scareTheShitOutOfPeople()
    }
}
