//variaveis globais
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var des = false;
var d = '';

var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var p_poligono = false;

var cor = $('#cor').val();
var tamLinha = $("#tam_linha").val();



function draw(obj) {
    if (obj.id === 'linha') {
        d = 'linha'
    }
    if (obj.id === 'poligono') {
        d = 'poligono'
    }
    if (obj.id === 'ponto') {
        d = 'ponto'
    }

}

function clear() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function draw_poly(ctx, x, y) {
    if (p_poligono) {
        ctx.lineWidth = tamLinha;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = cor;
        ctx.lineJoin = ctx.lineCap = 'round';
        p_poligono = false;
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
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
        if (d === 'linha') {
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
        if (d === 'poligono') {
            draw_poly(ctx, axi.x, axi.y)
        }

        if (d === 'ponto') {
            //desenha um ponto
            ctx.beginPath();
            ctx.lineWidth = tamLinha;
            ctx.moveTo(axi.x, axi.y);
            ctx.arc(axi.x, axi.y, 5, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();

        }

    }
}
