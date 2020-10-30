const cvs = document.getElementById('canvas')
const ctx = cvs.getContext('2d')

//create images
const bg = new Image()

bg.src = 'img/bg.jpg'

function draw() {
    ctx.drawImage(bg, 0, 0)
}

bg.onload = draw