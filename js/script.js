//variaveis globais
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var primitiva = false; // para desenhar primitivas
var mover = false;


var coordx = $(canvas).offset().left;
var coordy = $(canvas).offset().top;
var posX = posY = 0;
var px = py = 0;


var cor = $("#cor").val();
var tamLinha = $("#tam_linha").val();

primitivas = [];

function selecionaCor(obj) {
    cor = obj.value
}

function selecionaLinha(obj) {
    tamLinha = obj.value
}


$("#clear").on('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    primitivas= []
});


canvas.onmousedown = function (evt) {
    posX = parseInt(evt.clientX - coordx);
    posY = parseInt(evt.clientY - coordy);

    primitiva = true;
}
canvas.onmousemove = function () {
    primitiva = false;
    // console.log(primitivas)
}

canvas.onclick = function (evt) {

    primitiva = true;
    px = parseInt(evt.clientX - coordx);
    py = parseInt(evt.clientY - coordy);


    if (primitiva && !mover) {
        
        // ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(px, py);
        primitivas.push({mx:posX,my: posY, cx: px, cy: py, cor: cor, tam: tamLinha});
        ctx.strokeStyle = cor;
        ctx.lineWidth = tamLinha;
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();

    }

}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
        alert('Undo!');
    }
});


