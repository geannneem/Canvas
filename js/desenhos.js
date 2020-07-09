//variaveis globais
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var des = false;
var tipo_desenho = '';

var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var p_poligono = false;

var cor = $("#cor").val();
var tamLinha = $("#tam_linha").val();

function color(obj) {
    cor = obj.value
}

function widthLine(obj) {
    tamLinha = obj.value
}


function draw(obj) {
    if (obj.id === 'linha') {
        tipo_desenho = 'linha'
    }
    if (obj.id === 'poligono') {
        tipo_desenho = 'poligono'
    }
    if (obj.id === 'ponto') {
        tipo_desenho = 'ponto'
    }

}

$("#clear").on('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function draw_poly(ctx, x, y) {
    if (p_poligono) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        // ctx.strokeStyle = cor;
        ctx.fillStyle = cor;
        ctx.lineWidth = tamLinha;
        ctx.lineJoin = ctx.lineCap = 'round';
        p_poligono = false;
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        // ctx.fill();
    }

}

function getMouse(event) {
    var pointer = canvas.getBoundingClientRect();
    return {x: event.clientX - pointer.left, y: event.clientY - pointer.top}

}

// canvas.onclick= function (event) {
//     var axi = getMouse(event);
//     draw_poly(ctx, axi.x, axi.y);
// }

canvas.onmousedown = function (evt) {
    last_mousex = parseInt(evt.clientX - canvasx);
    last_mousey = parseInt(evt.clientY - canvasy);
    // var axi = getMouse(evt);
    // ctx.beginPath();
    // ctx.moveTo(axi.x, axi.y);
    des = true;
}
canvas.onmouseup = function () {
    des = false;
}

canvas.onclick = function (evt) {
    var axi = getMouse(evt);
    des = true;
    //
    // if (des) {
    //     ctx.lineTo(axi.x, axi.y);
    //     ctx.stroke();
    // }
    mousex = parseInt(evt.clientX - canvasx);
    mousey = parseInt(evt.clientY - canvasy);


    if (des) {
        if (tipo_desenho === 'linha') {
            //desenha segmento de reta
            ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
            ctx.beginPath();
            ctx.moveTo(last_mousex, last_mousey);
            ctx.lineTo(mousex, mousey);
            ctx.strokeStyle = cor;
            ctx.lineWidth = tamLinha;
            ctx.lineJoin = ctx.lineCap = 'round';
            ctx.stroke();
        }
        if (tipo_desenho === 'poligono') {
            draw_poly(ctx, axi.x, axi.y)
        }

        if (tipo_desenho === 'ponto') {
            //desenha um ponto
            ctx.beginPath();

            ctx.moveTo(axi.x, axi.y);
            ctx.arc(axi.x, axi.y, tamLinha, 0, 2 * Math.PI, true);
            ctx.strokeStyle = cor;
            ctx.fillStyle = cor;
            ctx.fill();
            ctx.stroke();

        }

    }
}
