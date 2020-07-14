var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var primitivas=[], objSelecionado = null;
var inicioX = 0, inicioY = 0;

function atualizarCanvas() {
    ctx.fillStyle = '#A0A0A0';
    ctx.fillRect(0, 0, canvas.width, canvas.width);

    for (var i = 0; i < primitivas.length; i++) {
        ctx.fillStyle = primitivas[i].color;
        ctx.fillRect(primitivas[i].x, primitivas[i].y, primitivas[i].width, primitivas[i].height);
    }
}

document.body.onload = function () {
    primitivas = [];

    primitivas.push({
        x: 0, y: 0,
        width: 100, height: 200,
        color: '#00f'
    });


    atualizarCanvas();

    canvas.onmousedown = function (event) {
        for (var i = 0; i < primitivas.length; i++) {
            if (primitivas[i].x < event.offsetX
                && (primitivas[i].width + primitivas[i].x > event.clientX)
                && primitivas[i].y < event.offsetY
                && (primitivas[i].height + primitivas[i].y > event.clientY)
            ) {
                objSelecionado = primitivas[i];
                inicioY = event.offsetY - primitivas[i].y;
                inicioX = event.offsetX - primitivas[i].x;

                break;
            }
        }
    }

    canvas.onmousemove = function (event) {
        if (objSelecionado != null) {
            objSelecionado.x = event.offsetX - inicioX;
            objSelecionado.y = event.offsetY - inicioY;
        }
        atualizarCanvas();
    }

    canvas.onmouseup = function (evet) {
        objSelecionado = null;
    }
}