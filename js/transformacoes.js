var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var primitivas = [], objSelecionado = null;
var posX = 0, posY = 0;
var angle = 0

function atualizarCanvas() {
    ctx.fillStyle = '#ebebeb';
    ctx.fillRect(0, 0, canvas.width, canvas.width);

    for (var i = 0; i < primitivas.length; i++) {
        ctx.beginPath();
        ctx.moveTo(primitivas[i].px, primitivas[i].py);
        ctx.lineTo(primitivas[i].x, primitivas[i].y);
        ctx.strokeStyle = primitivas[i].color;
        ctx.lineWidth = primitivas[i].tamanho;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
    }
}

document.body.onload = function () {
    primitivas = [];

    primitivas.push({
        px: 100, py: 150,
        x: 500, y: 300,
        color: 'pink', tamanho: 8,
    });


    atualizarCanvas();

    canvas.onmousedown = function (event) {
        for (var i = 0; i < primitivas.length; i++) {
            if (primitivas[i].x < event.offsetX
                && (primitivas[i].px + primitivas[i].x > event.clientX)
                && primitivas[i].y < event.offsetY
                && (primitivas[i].py + primitivas[i].y > event.clientY)
            ) {
                objSelecionado = primitivas[i];
                posY = event.offsetY - primitivas[i].y;
                posX = event.offsetX - primitivas[i].x;

                break;
            }
        }
        var clickAngle = getAngle()
    }

    canvas.onmousemove = function (event) {
        if (objSelecionado != null) {
            objSelecionado.x = event.offsetX - posX;
            objSelecionado.y = event.offsetY - posY;
        }
        atualizarCanvas();
    }

    canvas.onmouseup = function (evet) {
        objSelecionado = null;
    }
}


function getAngle(cX, cY, mX, mY) {
    var angle = Math.atan2(mY - cY, mX - cX);
    return angle;
}