var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var reloadBtn = document.getElementById('reload');
//create images
var bg = new Image();
var fg = new Image();
var pipeBottom = new Image();
var pipeUp = new Image();
var leha = new Image();
bg.src = 'img/bg.jpg';
fg.src = 'img/flappyFg.png';
pipeBottom.src = 'img/flappyPipeBottom.png';
pipeUp.src = 'img/flappyPipeUp.png';
leha.src = 'img/leha.png';
//create song
var mainTheme = new Audio();
var scoreSong = new Audio();
var endTheme = new Audio();
mainTheme.src = 'audio/mainTheme.mp3';
mainTheme.muted = false;
mainTheme.volume = 0.5;
scoreSong.src = 'audio/scrorePoo.mp3';
scoreSong.muted = false;
scoreSong.volume = 1;
endTheme.src = 'audio/poo.mp3';
scoreSong.muted = false;
scoreSong.volume = 1;
var gap = 90;
//key listener
var moveUp = function () {
    return yPos -= 35;
};
document.addEventListener('keydown', moveUp);
cvs.addEventListener('touchstart', moveUp);
// blocks
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};
//Leha position
var xPos = 10;
var yPos = 150;
var grav = 1.7;
var score = 0;
function draw() {
    document.getElementById('loader-content').style.display = 'none';
    mainTheme.play();
    ctx.drawImage(bg, 0, 0);
    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        if (pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        if ((xPos + leha.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + leha.height >= pipe[i].y + pipeUp.height + gap)) ||
            yPos + leha.height >= cvs.height - fg.height + 50) {
            mainTheme.muted = true;
            endTheme.play();
            cvs.style.display = 'none';
            document.getElementById('theEnd').style.display = 'block';
        }
        if (pipe[i].x === 5) {
            score++;
            scoreSong.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height + 50);
    ctx.drawImage(leha, xPos, yPos);
    yPos += grav;
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText("\u0421\u0447\u0435\u0442: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
window.onload = draw;
reloadBtn.addEventListener('click', function () {
    onclick = location.reload();
});
