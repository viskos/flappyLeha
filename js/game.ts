const cvs = <HTMLCanvasElement> document.getElementById('canvas')
const ctx: CanvasRenderingContext2D = cvs.getContext('2d')
const reloadBtn = <HTMLButtonElement> document.getElementById('reload')

//create images
const bg: HTMLImageElement = new Image()
const fg: HTMLImageElement = new Image()
const pipeBottom: HTMLImageElement = new Image()
const pipeUp: HTMLImageElement = new Image()
const leha: HTMLImageElement = new Image()

bg.src = 'img/bg.jpg'
fg.src = 'img/flappyFg.png'
pipeBottom.src = 'img/flappyPipeBottom.png'
pipeUp.src = 'img/flappyPipeUp.png'
leha.src = 'img/leha.png'

//create song
const mainTheme: HTMLAudioElement = new Audio()
const scoreSong: HTMLAudioElement = new Audio()
const endTheme: HTMLAudioElement = new Audio()

mainTheme.src = 'audio/mainTheme.mp3'
mainTheme.muted = false
mainTheme.volume = 0.5

scoreSong.src = 'audio/scrorePoo.mp3'
scoreSong.muted = false
scoreSong.volume = 1

endTheme.src = 'audio/poo.mp3'
scoreSong.muted = false
scoreSong.volume = 1

const gap: number = 90

//key listener
const moveUp = (): number => {
    return yPos -= 35
}
document.addEventListener('keydown', moveUp)
cvs.addEventListener('touchstart', moveUp)

// blocks
const pipe = []

interface IPipe {
    x: number,
    y: number
}

pipe[0] = <IPipe> {
    x: cvs.width,
    y: 0,
}

//Leha position
let xPos: number = 10
let yPos: number = 150
const grav: number = 1.7
let score: number = 0

function draw(): void {
    document.getElementById('loader-content').style.display = 'none'
    mainTheme.play()
    ctx.drawImage(bg, 0, 0)

    for (let i: number = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)

        pipe[i].x--

        if (pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            })
        }

        if (
            (xPos + leha.width >= pipe[i].x &&
                xPos <= pipe[i].x + pipeUp.width &&
                (yPos <= pipe[i].y + pipeUp.height ||
                    yPos + leha.height >= pipe[i].y + pipeUp.height + gap)) ||
            yPos + leha.height >= cvs.height - fg.height + 50
        ) {
            mainTheme.muted = true
            endTheme.play()
            cvs.style.display = 'none'
            document.getElementById('theEnd').style.display = 'block'
        }

        if (pipe[i].x === 5) {
            score++
            scoreSong.play()
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height + 50)
    ctx.drawImage(leha, xPos, yPos)

    yPos += grav

    ctx.fillStyle = '#000'
    ctx.font = '24px Arial'
    ctx.fillText(`Счет: ${score}`, 10, cvs.height - 20)
    requestAnimationFrame(draw)
}

window.onload = draw
reloadBtn.addEventListener('click', () => {
    onclick = <any> location.reload()
})
