//variaveis globais
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");



var coordx = $(canvas).offset().left;
var coordy = $(canvas).offset().top;
var posX = posY = 0;
var px = py = 0;


var cor = $(".btn-color").val();
var tamLinha = $(".btn-brush").val();

primitivas = [];

function selecionaCor(obj) {
    cor = obj.value
}

function selecionaLinha(obj) {
    tamLinha = obj.value
}


$("#clear").on('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cntext.clearRect(0, 0, canvas.width, canvas.height);
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


    if (primitiva) {

        // ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(px, py);

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


